import React, {useCallback, useEffect, useState} from 'react';
import styles from '../../../styles/buyToke.module.css';
import BidBUSD from './components/Busd';
import BidCD3D from './components/Amount3D';
import Image from 'next/image';
import DownA from '../../../public/assets/homepage/down-arrow.svg';
import {getBidPrice, getUnitPrice, tryParseAmount} from '../../../utils';
import CustomContainedButton from '../../CustomContainedButton';
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import ConnectButton from "../../ConnectWalletButton";
import {useCurrencyBalance, useCurrencyBalances} from "../../../state/wallet/hooks";
import {useCurrency} from "../../../hooks/Tokens";
import {BUSD, CD3D} from "../../../constants";
import {NETWORK_CHAIN_ID} from "../../../connectors";
import useSwapCallback from "../../../hooks/useSwapCallback";
import {useTradeExactIn, useTradeExactOut} from "../../../hooks/Trades";
import {useUserDeadline, useUserSlippageTolerance} from "../../../state/user/hooks";
import {JSBI} from 'cd3d-dex-libs-sdk';
import {computeSlippageAdjustedAmounts, computeTradePriceBreakdown, warningSeverity} from "../../../utils/prices";
import confirmPriceImpactWithoutFee from "../../Swap/confirmPriceImpactWithoutFee";

export const Field = {
  INPUT: 1,
  OUTPUT: 2
}

const BuyTokens = () => {
  const [independentField, setIndependentField] = useState(Field.INPUT)
  const { account } = useActiveWeb3React()
  const [busd, setBusd] = useState(0)
  const [cd3d, setcd3d] = useState(0)
  const [errMsg, setErrMsg] = useState('')

  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const validateBusd = (busd) => {
    if (busd < 10 || !busd) {
      setErrMsg('Minimum amount should not be less than 10!');
      return true;
    } else if (busd > 20000000) {
      setErrMsg('Maximum amount should not be greater than 200,00,000');
      return true;
    }
    setErrMsg('');
    return false;
  };

  const handleChangeOnBusd = useCallback((event) => {
    setBusd(event.target.value);
    setIndependentField(Field.INPUT);
  }, []);

  const handleChangeOnCd3d = useCallback((event) => {
    setcd3d(event.target.value);
    setIndependentField(Field.OUTPUT);
  }, []);

  // Input: BUSD, Output: CD3D
  const currencyBUSD = useCurrency(BUSD[NETWORK_CHAIN_ID].address);
  const currencyCD3D = useCurrency(CD3D[NETWORK_CHAIN_ID].address);

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [currencyBUSD, currencyCD3D]);
  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],      // BUSD
    [Field.OUTPUT]: relevantTokenBalances[1],     // CD3D
  }

  const isExactIn = independentField === Field.INPUT;

  const parsedAmount = isExactIn?tryParseAmount(busd, currencyBUSD) : tryParseAmount(cd3d, currencyCD3D);
  const trade = isExactIn?useTradeExactIn( parsedAmount, currencyCD3D):useTradeExactOut(currencyBUSD, parsedAmount);

  const formattedAmounts = {
    [Field.INPUT]: trade?.inputAmount?.toSignificant(6) ?? '',
    [Field.OUTPUT]: trade?.outputAmount?.toSignificant(6) ?? '',
  }

  useEffect(() => {
    validateBusd(formattedAmounts[Field.INPUT]);
  }, [formattedAmounts]);

  const userHasSpecifiedInputOutput = Boolean(
      parsedAmount?.greaterThan(JSBI.BigInt(0))
  )

  const [deadline] = useUserDeadline();
  const [allowedSlippage] = useUserSlippageTolerance();

  let inputError;

  if (!parsedAmount) {
    inputError = inputError ?? 'Enter an amount'
  }

  const slippageAdjustedAmounts = trade && allowedSlippage && computeSlippageAdjustedAmounts(trade, allowedSlippage)

  // compare input balance to max input based on version
  const [balanceIn, amountIn] = [
    currencyBalances[Field.INPUT],
    slippageAdjustedAmounts ? slippageAdjustedAmounts[Field.INPUT] : null,
  ]

  if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
    inputError = `Insufficient ${amountIn.currency.symbol} balance`
  }

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
      trade,
      allowedSlippage,
      deadline);

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  /**
   * Hosokawa 2021/12/7
   * Swap BUSD -> CD3D
   */
  const onBuy = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
      return
    }

    if (!swapCallback) {
      return
    }
    setSwapState((prevState) => ({ ...prevState, attemptingTxn: true, swapErrorMessage: undefined, txHash: undefined }))
    swapCallback()
        .then((hash) => {
          setSwapState((prevState) => ({
            ...prevState,
            attemptingTxn: false,
            swapErrorMessage: undefined,
            txHash: hash,
          }))
        })
        .catch((error) => {
          setSwapState((prevState) => ({
            ...prevState,
            attemptingTxn: false,
            swapErrorMessage: error.message,
            txHash: undefined,
          }))
        })
  }, [priceImpactWithoutFee, swapCallback, setSwapState]);

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  return (
    <div className={styles.buyTokeOuter}>
      <BidBUSD value={formattedAmounts[Field.INPUT]} handleChangeOnBusd={handleChangeOnBusd} errMsg={errMsg} />
      <div className={styles.downOuter}>
        <Image src={DownA} alt='Picture of DownArrow' />
      </div>
      <BidCD3D value={formattedAmounts[Field.OUTPUT]} handleChangeOnCd3d={handleChangeOnCd3d} rate={ getUnitPrice(formattedAmounts[Field.INPUT], formattedAmounts[Field.OUTPUT])}/>
      {
        !account?
            <ConnectButton />
            : !trade?.route && userHasSpecifiedInputOutput ?
              <CustomContainedButton
                  btnTitle={'Insufficient liquidity for this trade.'}
                  customStyles={{ color: 'white' }}
                  disabled={true}
                  onClick={() => {}}
              />
            // TODO Approve tokens
            :
            <CustomContainedButton
                btnTitle={inputError || (priceImpactSeverity > 3 ? 'Price Impact Too High' : 'Buy CD3D')}
                customStyles={{ color: 'white' }}
                disabled={!inputError || priceImpactSeverity > 3 || !!swapCallbackError}
                onClick={onBuy}
            />
      }
    </div>
  );
};

export default BuyTokens;

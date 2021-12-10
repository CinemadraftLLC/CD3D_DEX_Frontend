import React, {useCallback, useEffect, useState} from 'react';
import styles from '../../../styles/buyToke.module.css';
import BidBUSD from '../BuyTokens/components/Busd';
import BidCD3D from '../BuyTokens/components/Amount3D';
import Image from 'next/image';
import DownA from '../../../public/assets/homepage/down-arrow.svg';
import {getUnitPrice, tryParseAmount} from '../../../utils';
import CustomContainedButton from '../../CustomContainedButton';
import ConnectButton from "../../ConnectWalletButton";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import useSwapCallback from "../../../hooks/useSwapCallback";
import {useCurrency} from "../../../hooks/Tokens";
import {BUSD, CD3D} from "../../../constants";
import {NETWORK_CHAIN_ID} from "../../../connectors";
import {useCurrencyBalance, useCurrencyBalances} from "../../../state/wallet/hooks";
import {useTradeExactIn, useTradeExactOut} from "../../../hooks/Trades";
import {useUserDeadline, useUserSlippageTolerance} from "../../../state/user/hooks";
import {Field} from "../BuyTokens";
import {JSBI, Price} from "cd3d-dex-libs-sdk";
import {computeSlippageAdjustedAmounts, computeTradePriceBreakdown, warningSeverity} from "../../../utils/prices";
import confirmPriceImpactWithoutFee from "../../Swap/confirmPriceImpactWithoutFee";
import LiquiditySubmittingTxDialog from "../../Dialogs/LiquiditySubmittingTxDialog";
import LiquiditySupplyDialog from "../../Dialogs/LiquiditySupplyDialog";

const SellTokens = () => {
  const [independentField, setIndependentField] = useState(Field.INPUT)
  const { account } = useActiveWeb3React()
  const [busd, setBusd] = useState(0);
  const [cd3d, setcd3d] = useState(0);
  const [errMsg, setErrMsg] = useState('');

  const [{ swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState({
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

  const handleChangeOnCd3d = (event) => {
    setcd3d(event.target.value);
    setIndependentField(Field.INPUT);
  };

  const handleChangeOnBusd = (event) => {
    setBusd(event.target.value);
    setIndependentField(Field.OUTPUT);
  };

  const currencyCD3D = useCurrency(CD3D[NETWORK_CHAIN_ID].address);
  const currencyBUSD = useCurrency(BUSD[NETWORK_CHAIN_ID].address);

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [currencyCD3D, currencyBUSD]);
  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],      // CD3D
    [Field.OUTPUT]: relevantTokenBalances[1],     // BUSD
  }

  const isExactIn = independentField === Field.INPUT;

  const parsedAmount = isExactIn?tryParseAmount(cd3d, currencyCD3D): tryParseAmount(busd, currencyBUSD);
  const trade = isExactIn?useTradeExactIn( parsedAmount, currencyBUSD):useTradeExactOut(currencyCD3D, parsedAmount);

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
  const onSell = useCallback(() => {

    setShowConfirmModal(false);

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
  const swapPrice = trade?new Price(currencyCD3D, currencyBUSD, trade.inputAmount.raw, trade.outputAmount.raw):undefined;

  return (
    <div className={styles.buyTokeOuter}>
      <BidCD3D value={formattedAmounts[Field.INPUT]} handleChangeOnCd3d={handleChangeOnCd3d} rate={ swapPrice?.toSignificant(6)??0 }/>
      <div className={styles.downOuter}>
        <Image src={DownA} alt='Picture of DownArrow' />
      </div>
      <BidBUSD value={formattedAmounts[Field.OUTPUT]} handleChangeOnBusd={handleChangeOnBusd} errMsg={errMsg} />
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
                btnTitle={inputError || (priceImpactSeverity > 3 ? 'Price Impact Too High' : 'Sell CD3D')}
                customStyles={{ color: 'white' }}
                disabled={inputError || priceImpactSeverity > 3 || !!swapCallbackError}
                onClick={onSell}
            />
      }
      <LiquiditySubmittingTxDialog
          show={attemptingTxn}
          txHash={txHash}
          swapErrorMessage={swapErrorMessage}
          onClose={() => setSwapState(prevState => ({
            ...prevState,
            attemptingTxn: false
          }))}
      />
    </div>
  );
};

export default SellTokens;


import React, {useCallback, useState} from 'react';
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
import {useCurrencyBalance} from "../../../state/wallet/hooks";
import {useTradeExactIn, useTradeExactOut} from "../../../hooks/Trades";
import {useUserDeadline, useUserSlippageTolerance} from "../../../state/user/hooks";
import {Field} from "../BuyTokens";

const SellTokens = () => {
  const [independentField, setIndependentField] = useState(Field.INPUT)
  const { account } = useActiveWeb3React()
  const [busd, setBusd] = useState(0);
  const [cd3d, setcd3d] = useState(0);
  const [errMsg, setErrMsg] = useState('');
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

  const handleChangeOnCd3d = (event) => {
    setcd3d(event.target.value);
    setIndependentField(Field.INPUT);
  };

  const handleChangeOnBusd = (event) => {
    setBusd(event.target.value);
    setIndependentField(Field.OUTPUT);
    validateBusd(event.target.value);
  };

  const currencyCD3D = useCurrency(CD3D[NETWORK_CHAIN_ID].address);
  const cd3dBalance = useCurrencyBalance(account ?? undefined, currencyCD3D ?? undefined);
  console.log(`cd3d Balance: ${cd3dBalance?.toSignificant(6)}`);

  const currencyBUSD = useCurrency(BUSD[NETWORK_CHAIN_ID].address);
  const busdBalance = useCurrencyBalance(account ?? undefined, currencyBUSD ?? undefined);
  console.log(`busd balance: ${busdBalance?.toSignificant(6)}`);

  const isExactIn = independentField === Field.INPUT;
  console.log('input', isExactIn);
  const parsedAmount = isExactIn?tryParseAmount(cd3d, currencyCD3D): tryParseAmount(busd, currencyBUSD);
  const trade = isExactIn?useTradeExactIn( parsedAmount, currencyBUSD):useTradeExactOut(currencyCD3D, parsedAmount);
  const [deadline] = useUserDeadline();
  const [allowedSlippage] = useUserSlippageTolerance();

  const formattedAmounts = {
    [Field.INPUT]: trade?.inputAmount?.toSignificant(6) ?? '',
    [Field.OUTPUT]: trade?.outputAmount?.toSignificant(6) ?? '',
  }

  console.log('amount', formattedAmounts, allowedSlippage);

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
      trade,
      allowedSlippage,
      deadline);

  /**
   * Hosokawa 2021/12/7
   * Swap BUSD -> CD3D
   */
  const onSell = useCallback(() => {
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
  }, [swapCallback, setSwapState]);

  return (
    <div className={styles.buyTokeOuter}>
      <BidCD3D value={formattedAmounts[Field.INPUT]} handleChangeOnCd3d={handleChangeOnCd3d} rate={ getUnitPrice(formattedAmounts[Field.OUTPUT], formattedAmounts[Field.INPUT])}/>
      <div className={styles.downOuter}>
        <Image src={DownA} alt='Picture of DownArrow' />
      </div>
      <BidBUSD value={formattedAmounts[Field.OUTPUT]} handleChangeOnBusd={handleChangeOnBusd} errMsg={errMsg} />
      {
        !account?
            <ConnectButton />
            :
            <CustomContainedButton btnTitle={'Sell CD3D'} customStyles={{ color: 'white' }} onClick={onSell}/>
      }
    </div>
  );
};

export default SellTokens;


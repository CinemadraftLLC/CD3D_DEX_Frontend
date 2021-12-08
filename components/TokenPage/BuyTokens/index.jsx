import React, { useEffect, useState } from 'react';
import styles from '../../../styles/buyToke.module.css';
import BidBUSD from './components/Busd';
import BidCD3D from './components/Amount3D';
import Image from 'next/image';
import DownA from '../../../public/assets/homepage/down-arrow.svg';
import useAuth from '../../../hooks/useAuth';
import { getBidPrice } from '../../../utils';
import CustomContainedButton from '../../CustomContainedButton';
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import ConnectButton from "../../ConnectWalletButton";
import {useCurrencyBalance} from "../../../state/wallet/hooks";
import {useCurrency} from "../../../hooks/Tokens";
import {BUSD, CD3D} from "../../../constants";
import {NETWORK_CHAIN_ID} from "../../../connectors";

const BuyTokens = () => {
  const { account } = useActiveWeb3React()
  const { login } = useAuth();
  const [busd, setBusd] = useState(0);
  const [cd3d, setcd3d] = useState(0);
  const [bidPrice, setBidPrice] = useState(0);
  const [errMsg, setErrMsg] = useState('');

  const currencyCD3D = useCurrency(CD3D[NETWORK_CHAIN_ID].address);
  const cd3dBalance = useCurrencyBalance(account ?? undefined, currencyCD3D ?? undefined);
  console.log(`cd3d Balance: ${cd3dBalance?.toSignificant(6)}`);

  const currencyBUSD = useCurrency(BUSD[NETWORK_CHAIN_ID].address);
  const busdBalance = useCurrencyBalance(account ?? undefined, currencyBUSD ?? undefined);
  console.log(`busd balance: ${busdBalance?.toSignificant(6)}`);

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

  useEffect(() => {
    setBidPrice(getBidPrice(busd, cd3d));
  }, [cd3d, busd]);

  const handleChangeOnBusd = (event) => {
    setBusd(event.target.value);
    validateBusd(event.target.value);
  };
  const handleChangeOnCd3d = (event) => {
    setcd3d(event.target.value);
  };


  /**
   * Hosokawa 2021/12/7
   * Swap BUSD -> CD3D
   */
  const onBuy = () => {
    console.log('buy');
  }

  return (
    <div className={styles.buyTokeOuter}>
      <BidBUSD handleChangeOnBusd={handleChangeOnBusd} errMsg={errMsg} />
      <div className={styles.downOuter}>
        <Image src={DownA} alt='Picture of DownArrow' />
      </div>
      <BidCD3D handleChangeOnCd3d={handleChangeOnCd3d} />
      {
        !account?
            <ConnectButton />
            :
            <CustomContainedButton btnTitle={'Buy CD3D'} customStyles={{ color: 'white' }} onClick={onBuy}/>
      }
    </div>
  );
};

export default BuyTokens;

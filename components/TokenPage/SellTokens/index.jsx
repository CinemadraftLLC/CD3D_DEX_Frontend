import React, { useEffect, useState } from 'react';
import styles from '../../../styles/buyToke.module.css';
import BidBUSD from '../BuyTokens/components/Busd';
import BidCD3D from '../BuyTokens/components/Amount3D';
import Image from 'next/image';
import DownA from '../../../public/assets/homepage/down-arrow.svg';
import useAuth from '../../../hooks/useAuth';
import { getBidPrice } from '../../../utils';
import CustomContainedButton from '../../CustomContainedButton';
import ConnectButton from "../../ConnectWalletButton";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";

const SellTokens = () => {
  const { account } = useActiveWeb3React()
  const { login } = useAuth();
  const [busd, setBusd] = useState(0);
  const [cd3d, setcd3d] = useState(0);
  const [bidPrice, setBidPrice] = useState(0);
  const [errMsg, setErrMsg] = useState('');

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
  const onSell = () => {
    console.log('sell');
  }

  return (
    <div className={styles.buyTokeOuter}>
      <BidCD3D handleChangeOnCd3d={handleChangeOnCd3d} />
      <div className={styles.downOuter}>
        <Image src={DownA} alt='Picture of DownArrow' />
      </div>
      <BidBUSD handleChangeOnBusd={handleChangeOnBusd} errMsg={errMsg} />
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

// <Typography variant='h5' gutterBottom component='h5'>
//   Buy Tokens
// </Typography>
// <BidPrice bidPrice={bidPrice} />;

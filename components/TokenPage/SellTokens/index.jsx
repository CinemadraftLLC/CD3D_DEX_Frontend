import React, { useEffect, useState } from 'react';
import styles from '../../../styles/buyToke.module.css';
import Typography from '@mui/material/Typography';
import BidPrice from '../BuyTokens/components/bidPri';
import BidBUSD from '../BuyTokens/components/Busd';
import BidCD3D from '../BuyTokens/components/Amount3D';
import Button from '@mui/material/Button';
import Image from 'next/image';
import DownA from '../../../public/assets/homepage/down-arrow.svg';
import { useWeb3React } from '@web3-react/core';
import useAuth from '../../../hooks/useAuth';
import { Injected } from '../../../constant/constants';
import { getBidPrice } from '../../../utils/utils';
import useCd3d from '../../../hooks/useCD3D';
import CustomContainedButton from '../../CustomContainedButton';

const SellTokens = () => {
  const { active } = useWeb3React();
  const { login } = useAuth();
  const { placeSellOrders, getSampleToken } = useCd3d();
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

  return (
    <div className={styles.buyTokeOuter}>
      <BidCD3D handleChangeOnCd3d={handleChangeOnCd3d} />
      <div className={styles.downOuter}>
        <Image src={DownA} alt='Picture of DownArrow' />
      </div>
      <BidBUSD handleChangeOnBusd={handleChangeOnBusd} errMsg={errMsg} />
      <CustomContainedButton btnTitle={'Buy CD3D'} customStyles={{ color: 'white' }} />
    </div>
  );
};

export default SellTokens;

// <Typography variant='h5' gutterBottom component='h5'>
//   Buy Tokens
// </Typography>
// <BidPrice bidPrice={bidPrice} />;

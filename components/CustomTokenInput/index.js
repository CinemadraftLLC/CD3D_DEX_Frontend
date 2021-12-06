import React from 'react';
import styles from '../../styles/buyToke.module.css';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { FormHelperText } from '@mui/material';

const CustomTokenInput = (props) => {
  const { handleChange, errMsg, tokenName, tokenImage, maxButton } = props;
  return (
    <div className={styles.bidPriceOuter}>
      <div className={styles.bidPriceInput}>
        <input type='number' placeholder='0' min='0' onChange={handleChange} />
        <Typography variant='subtitle2' gutterBottom component='p'>
          {maxButton && <text className={styles.maxButton}>MAX</text>}
          {tokenName}
          {tokenImage && <Image src={tokenImage} alt={`Picture of`} />}
        </Typography>
      </div>
      {errMsg && <FormHelperText error>{errMsg}</FormHelperText>}
    </div>
  );
};

export default CustomTokenInput;

import React from 'react';
import styles from '../../../../styles/buyToke.module.css';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import CD3Dlogo from '../../../../public/assets/homepage/CD3D-icon.svg';
import InvertIcon from '../../../invertIcon';

const Amount3D = (props) => {
  const { handleChangeOnCd3d } = props;
  return (
    <div className={styles.bidPriceOuter}>
      <div className={styles.bidPriceInput}>
        <input type='number' placeholder='0' min='0' onChange={handleChangeOnCd3d} />
        <Typography variant='subtitle2' gutterBottom component='p'>
          CD3D <Image src={CD3Dlogo} alt='Picture of CD3D' />
        </Typography>
      </div>
      <div className={styles.tokenPriceContainer}>
        <Typography variant='subtitle2' gutterBottom component='p'>
          1 CD3D = 0.00127 BUSD
        </Typography>
        <InvertIcon />
      </div>
    </div>
  );
};

export default Amount3D;

// <label>
//   Amount in CD3D <span>(equals how many tokens I will get?)</span>
// </label>;

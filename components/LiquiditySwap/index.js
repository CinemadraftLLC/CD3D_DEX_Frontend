import React from 'react';
import CustomContainedButton from '../../components/CustomContainedButton';
import PlusIcon from '../../public/assets/plusIcon.svg';
import CustomTokenInput from '../../components/CustomTokenInput';
import BUSD from '../../public/assets/homepage/BUSD-icon.svg';
import CD3D from '../../public/assets/homepage/CD3D-icon.svg';
import { Typography } from '@material-ui/core';
import styles from '../../styles/liduidity.module.css';
import Image from 'next/image';

function LiquiditySwap(props) {
  return (
    <div className={styles.subContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Create Liquidity</div>
        <div className={styles.subTitle}>Provide to receive trading fees</div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.tokenInputContainer}>
          <CustomTokenInput handleChange={() => {}} errMsg={''} tokenName={'BUSD'} tokenImage={BUSD} maxButton={true} />
          <div className={styles.tokenInputTextContainer}>
            <Typography variant='subtitle2' gutterBottom component='p'>
              Balance : 0.009352
            </Typography>
          </div>
        </div>
        <div className={styles.downOuter}>
          <Image src={PlusIcon} alt='Picture of DownArrow' />
        </div>
        <div className={styles.tokenInputContainer}>
          <CustomTokenInput handleChange={() => {}} errMsg={''} tokenName={'CD3D'} tokenImage={CD3D} maxButton={true} />
          <div className={styles.tokenInputTextContainer}>
            <Typography variant='subtitle2' gutterBottom component='p'>
              Balance : 0.009352
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.statsContainer}>
        <Typography variant='h6' gutterBottom component='p' className={styles.statsHeading}>
          Initial prices and pool share
        </Typography>
        <div className={styles.statsSubContainer}>
          <div className={styles.stats}>
            <Typography variant='subtitle2' gutterBottom component='p'>
              1
            </Typography>
            <Typography variant='subtitle2' gutterBottom component='p'>
              BUSD per CD3D
            </Typography>
          </div>
          <div className={styles.stats}>
            <Typography variant='subtitle2' gutterBottom component='p'>
              1
            </Typography>
            <Typography variant='subtitle2' gutterBottom component='p'>
              BUSD per CD3D
            </Typography>
          </div>
          <div className={styles.stats}>
            <Typography variant='subtitle2' gutterBottom component='p'>
              1
            </Typography>
            <Typography variant='subtitle2' gutterBottom component='p'>
              BUSD per CD3D
            </Typography>
          </div>
        </div>
      </div>
      <CustomContainedButton
        btnTitle={props.btnTitle}
        customStyles={{
          color: 'white',
        }}
        disabled={props.disabled}
      />
    </div>
  );
}

export default LiquiditySwap;

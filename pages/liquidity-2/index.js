import React from 'react';
import styles from '../../styles/liquidity2.module.css';
import LiquiditySwap from '../../components/LiquiditySwap';
import { Typography } from '@material-ui/core';
import Image from 'next/image';
import Footer from '../../components/footer';
import Header from '../../components/Header';
function Liquidity2() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <LiquiditySwap disabled={false} btnTitle={'Supply'} />
        <div className={styles.miniContainer}>
          <div className={styles.title}>
            <Typography variant='subtitle2' component={'p'}>
              LP tokens in your wallet
            </Typography>
          </div>
          <div className={styles.tokenStats}>
            <div className={styles.statContainer}>
              <div className={styles.lpContainer}>
                <Image src={'/assets/busd-cd3d.png'} alt={''} height={40} width={50} />
                <Typography variant='subtitle2' component={'p'}>
                  BUSD - CD3D LP
                </Typography>
              </div>
              <div className={styles.lpValues}>0.00134</div>
            </div>
            <div className={styles.statContainer}>
              <div className={styles.lpContainer}>
                <Typography variant='subtitle2' component={'p'}>
                  Share of Pool
                </Typography>
              </div>
              <div className={styles.lpValues}>0.000002%</div>
            </div>
            <div className={styles.statContainer}>
              <div className={styles.lpContainer}>
                <Typography variant='subtitle2' component={'p'}>
                  Pooled CD3D
                </Typography>
              </div>
              <div className={styles.lpValues}>167353</div>
            </div>
            <div className={styles.statContainer}>
              <div className={styles.lpContainer}>
                <Typography variant='subtitle2' component={'p'}>
                  Pooled BUSD
                </Typography>
              </div>
              <div className={styles.lpValues}> 0.0032</div>
            </div>
          </div>
        </div>
        <div className={styles.popover}>
          <Image src={'/assets/homepage/popoverimg.png'} alt={''} height={'250px'} width={'250px'} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Liquidity2;

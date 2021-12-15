import React from 'react';
import styles from '../../styles/liduidity.module.css';
import Image from 'next/image';
import Footer from '../../components/footer';
import LiquiditySwap from '../../components/LiquiditySwap';
import {Container} from "@mui/material";
function Liquidity() {
    return (
        <Container maxWidth={"xl"}>
            <div className={styles.container}>
                <LiquiditySwap/>
                <div className={styles.miniBottomContainer}>
                    Add liquidity to earn 0.17% of all trades on this trading pair, relative to your portion of the pool. You may claim your real-time accrued
                    fees added to the pool by withdrawing your liquidity.
                </div>
                <div className={styles.popover}>
                    <Image src={'/assets/homepage/popoverimg.png'} alt={''} height={'250px'} width={'250px'} />
                </div>
                <Footer />
            </div>
        </Container>
    );
}

export default Liquidity;

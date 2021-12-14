import React from 'react';
import styles from '../../styles/liduidity.module.css';
import Image from 'next/image';
import Footer from '../../components/footer';
import LiquiditySwap from '../../components/LiquiditySwap';
import {Container, Stack} from "@mui/material";
import ClearFix from "../../components/ClearFix/ClearFix";
function Liquidity() {
  return (
    <Container maxWidth={"xl"}>
      <div className={styles.container}>
        <Stack direction={"column"} justifyContent={"start"} alignItems={"center"} spacing={2}>
            <LiquiditySwap/>
            <div className={styles.miniBottomContainer}>
                Add liquidity to earn 0.17% of all trades on this trading pair, relative to your portion of the pool. You may claim your real-time accrued
                fees added to the pool by withdrawing your liquidity.
            </div>
            <ClearFix height={100}/>
        </Stack>
      </div>
    </Container>
  );
}

export default Liquidity;

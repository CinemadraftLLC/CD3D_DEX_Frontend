import React from 'react';
import LiquiditySwap from '../../components/LiquiditySwap';
import {Box, Container, Stack, Typography} from "@mui/material";
import ClearFix from "../../components/ClearFix/ClearFix";
import {styled} from "@mui/material/styles";

const LiquidityPost = styled(Box)({
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: '15px',
    padding: "30px",
    backdropFilter: "blur(30px)",
    position: "relative",
    overflow: "hidden",
    '& .MuiTypography-subtitle1': {
        color: "#BAC4D7",
        fontSize: "14px",
        textAlign: "center",
        lineHeight: "32px",
        display: "block",
    }
})
const Liquidity = () => {
    return (
        <Container maxWidth={"sm"}>
            <Stack direction={"column"} justifyContent={"start"} alignItems={"center"} spacing={2}>
                <LiquiditySwap/>
                <LiquidityPost>
                    <Typography component={"span"} variant={"subtitle1"}>
                        Add liquidity to earn 0.17% of all trades on this trading pair, relative to your portion of the pool. You may claim your real-time accrued
                        fees added to the pool by withdrawing your liquidity.
                    </Typography>
                </LiquidityPost>
                <ClearFix height={100}/>
            </Stack>
        </Container>
    );
}

export default Liquidity;

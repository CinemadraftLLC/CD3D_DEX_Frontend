import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import BidPlace from "../../components/TokenPage/BidPlace";
import BuyTokens from "../../components/TokenPage/BuyTokens";
import styles from "../../styles/token.module.css";


const Token = () => {
    return (
        <>
            <div className={styles.tokenOuter}>
                <Container fixed>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            <div className={styles.bidOuter}>
                                <BidPlace />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={styles.buyTokeOuter}>
                                <BuyTokens />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
};

export default Token;

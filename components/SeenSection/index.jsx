import React from "react";
import styles from "../../styles/seen.module.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import Logo1 from "../../public/assets/homepage/BSCArmy@2x.png";
import Logo2 from "../../public/assets/homepage/YahooFinance@2x.png";
import Logo3 from "../../public/assets/homepage/Marketwatch@2x.png";
import Logo4 from "../../public/assets/homepage/Coinspeaker@2x.png";

const SeenSection = () => {
  return (
    <div className={styles.seenOuter}>
      <Container fixed>
        <Typography variant="h4" gutterBottom component="h4">
          As Seen In
        </Typography>
        <div className={styles.logoOuter}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <div className={styles.imgSeenOuter}>
                <a href="https://bscarmy.com/">
                  <Image src={Logo1} alt="Picture of the logo1" />
                </a>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={styles.imgSeenOuter}>
                <a href="https://finance.yahoo.com/news/cd3d-where-defi-gaming-meet-012900190.html">
                  <Image src={Logo2} alt="Picture of the logo2" />
                </a>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={styles.imgSeenOuter}>
                <a href="https://www.marketwatch.com/press-release/cd3d-where-defi-and-gaming-meet-set-to-launch-in-october-2021-09-23">
                  <Image src={Logo3} alt="Picture of the logo3" />
                </a>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={styles.imgSeenOuter}>
                <a href="https://www.coinspeaker.com/cinemadraft-bsc-cd3d-tokens/">
                  <Image src={Logo4} alt="Picture of the logo4" />
                </a>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default SeenSection;

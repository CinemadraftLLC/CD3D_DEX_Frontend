import React from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import styles from "../../styles/mainBanner.module.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ReactPlayer from "react-player";

const Banner = () => {
  const handleOnClick = () => {
    window.open(
      "https://app.apeswap.finance/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0x9108c36DC1DCbf08187D4f4D4579D72e6A35d979"
    );
  };
  return (
    <div className={styles.mainBanner}>
      <Container fixed>
        <Grid container spacing={2}>
          <div className={styles.bannerInner}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h4" gutterBottom component="h3">
                Where <span>DeFi</span> and<span> Gaming</span> meet{" "}
                <i>Play. Trade. Hold. WIN.</i>
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="p">
                The official DeFi launchpad & token of the CinemaDraft game
              </Typography>
              <Button
                variant="contained"
                className={styles.LikeWin}
                onClick={handleOnClick}
              >
                <Typography variant="subtitle1" className={styles.winningBtn}>
                  I Like Winning
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <div className={styles.bannerVideo}>
                <ReactPlayer
                  url="https://youtu.be/ColLJVtLm6E"
                  playIcon={<PlayCircleOutlineIcon />}
                />
              </div>
            </Grid>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;

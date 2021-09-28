import React from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import styles from "../../styles/mainBanner.module.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ReactPlayer from "react-player";
import { style } from "@mui/system";
// import MainBanner from './bannerSection.style';

const Banner = () => {
  return (
    <div className={styles.mainBanner}>
      <Container fixed>
        <Grid container spacing={2}>
          <div className={styles.bannerInner}>
            <Grid item xs={12} sm={12} md={7}>
              <Typography variant="h3" gutterBottom component="h3">
                Where <span>DeFi</span> and<span> Gaming</span> meet{" "}
                <i>Play. Trade. Hold. WIN.</i>
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="p">
                The official DeFi launchpad & token of the CinemaDraft game
              </Typography>
              <Button variant="contained" className={styles.LikeWin}>
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

import React from "react";
import Grid from "@mui/material/Grid";
import styles from "../../styles/soon.module.css";
import Image from "next/image";
import ComingSoon from "../../public/assets/homepage/ComingSoon.svg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SoonItem from "./SoonComponents/soonItem";
import { commingSoonData } from "data/data";
const Comingsoon = () => {
  return (
    <div className={styles.soonOuter}>
      <Container>
        <Grid container spacing={2}>
          <Grid item sm={12} md={7}>
            <Typography variant="h4" gutterBottom component="h4">
              “Ever wonder why fund managers can’t beat the S&amp;P 500? ‘Cause
              they’re sheep - and <span>sheep get slaughtered.”</span>
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="p">
              – Gordon Gekko, WALL STREET
            </Typography>
            <Grid className={styles.soonGrid2} container spacing={2}>
              {commingSoonData.map((elem) => (
                <Grid item xs={12} sm={6} md={4} key={elem.id}>
                  <SoonItem name={elem.name} time={elem.time} />
                </Grid>
              ))}
            </Grid>
            <Grid className={styles.soonGrid2} container spacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="subtitle2" gutterBottom component="p">
                  FORMAT
                </Typography>
                <Typography variant="h5" gutterBottom component="h5">
                  Batch/Dutch Auction
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <ul>
                  <li>- Enter your bid price per token</li>
                  <li>- Enter amount you want to spend</li>
                  <li>- Submit your bid & pay small gas fee</li>
                  <li>
                    - Once auction ends, token orders will be filled from
                    highest price bid to lowest until supply is gone
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={5}>
            <Image src={ComingSoon} alt="Picture of the author" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Comingsoon;

import React from "react";
import styles from "../../styles/dex.module.css";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DraftItem from "../DraftSec/DraftComponent/DraftItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { DexSecData } from "../../public/data/data";
import Link from "next/link";

const DexSec = () => {
  return (
    <div className={styles.dexSec}>
      <Container fixed>
        <Typography variant="h4" gutterBottom component="h4">
          DEX with the BEST
        </Typography>
        <Typography variant="h6" gutterBottom component="h6">
          <i>“What I love more than money is other people’s money.”</i>
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="p">
          – Lawrence Garfield, OTHER PEOPLE’S MONEY
        </Typography>
        <Grid className={styles.itemGrid} container spacing={2}>
          {DexSecData.map((i) => (
            <Grid item xs={12} sm={6} md={4} key={i.id}>
              <DraftItem item={i} />
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" className={styles.DexitemButton}>
          <Link href="https://cinemadraft.co">Play Now</Link>
        </Button>
      </Container>
    </div>
  );
};

export default DexSec;

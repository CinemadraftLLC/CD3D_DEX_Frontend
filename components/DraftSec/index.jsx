import React from "react";
import styles from "../../styles/draft.module.css";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DraftItem from "./DraftComponent/DraftItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { DraftSecData } from "../../public/data/data";

const DraftSec = () => {
  return (
    <div className={styles.draftSec}>
      <Container fixed>
        <Typography variant="h4" gutterBottom component="h4">
          The stars align at CinemaDraft
        </Typography>
        <Typography variant="h6" gutterBottom component="h6">
          <i>“You are only ever as good to me as the money you make!”</i>
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="p">
          – Micky, 21
        </Typography>
        <Grid className={styles.itemGrid} container spacing={2}>
          {DraftSecData.map((i) => (
            <Grid item xs={12} sm={6} md={3} key={i.id}>
              <DraftItem item={i} />
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" className={styles.DraftitemButton}>
          Marketplace
        </Button>
      </Container>
    </div>
  );
};

export default DraftSec;

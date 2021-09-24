import React from "react";
import Grid from "@mui/material/Grid";
import styles from "../../../../styles/bidGrid.module.css";
import Typography from "@mui/material/Typography";

const BidGrid = () => {
  return (
    <div className={styles.bidGridOuter}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <div className={styles.bidGridItem}>
            <Typography variant="subtitle2" gutterBottom component="p">
              MINIMUM BID
            </Typography>
            <Typography variant="h6" gutterBottom component="h6">
              $0.01 BUSD/CD3D
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={styles.bidGridItem}>
            <Typography variant="subtitle2" gutterBottom component="p">
              MINIMUM BUY
            </Typography>
            <Typography variant="h6" gutterBottom component="h6">
              $10.00 BUSD
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={styles.bidGridItem}>
            <Typography variant="subtitle2" gutterBottom component="p">
              MAXIMUM BUY
            </Typography>
            <Typography variant="h6" gutterBottom component="h6">
              $200,000 BUSD
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default BidGrid;

import React from "react";
import styles from "../../../../styles/buyToke.module.css";
import Typography from "@mui/material/Typography";

const BidPri = (props) => {
  const { bidPrice } = props;
  return (
    <div className={styles.bidPriceOuter}>
      <label>
        Bid Price <span>(How much do I think this is worth?)</span>
      </label>
      <div className={styles.bidPriceInput}>
        <input type="number" disabled placeholder="0" value={bidPrice ?? 0} />
        <Typography variant="subtitle2" gutterBottom component="div">
          BUSD/CD3D
        </Typography>
      </div>
    </div>
  );
};

export default BidPri;

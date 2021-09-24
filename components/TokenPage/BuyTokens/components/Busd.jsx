import React from "react";
import styles from "../../../../styles/buyToke.module.css";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import BUSD from "../../../../public/assets/homepage/BUSD-icon.svg";

const Busd = () => {
  return (
    <div className={styles.bidPriceOuter}>
      <label>
        Amount in BUSD <span> (How much do I think I can spend?)</span>
      </label>
      <div className={styles.bidPriceInput}>
        <input type="number" placeholder="0" />
        <Typography variant="subtitle2" gutterBottom component="p">
          BUSD <Image src={BUSD} alt="Picture of BUSD" />
        </Typography>
      </div>
      <div className={styles.amountMin}>
        <Typography variant="subtitle2" gutterBottom component="p">
          Approx. $5.00
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="p">
          Min. Buy $10.00
        </Typography>
      </div>
    </div>
  );
};

export default Busd;

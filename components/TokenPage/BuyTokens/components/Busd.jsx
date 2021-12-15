import React from "react";
import styles from "../../../../styles/buyToke.module.css";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import BUSD from "../../../../public/assets/homepage/BUSD-icon.svg";
import { FormHelperText } from "@mui/material";

const Busd = (props) => {
  const { value, handleChangeOnBusd, errMsg } = props;
  return (
    <div className={styles.bidPriceOuter}>
      <div className={styles.bidPriceInput}>
        <input type='number' value={value} placeholder='0' min='0' onChange={handleChangeOnBusd} />
        <Typography variant='subtitle2' gutterBottom component='div'>
          BUSD <Image src={BUSD} alt='Picture of BUSD' />
        </Typography>
      </div>
      {errMsg && <FormHelperText error>{errMsg}</FormHelperText>}

      <div className={styles.amountMin}>
        <Typography variant='subtitle2' gutterBottom component='div'>
          Approx $5.00
        </Typography>
        <Typography variant='subtitle2' gutterBottom component='div'>
          Min. Buy $10.00
        </Typography>
      </div>
    </div>
  );
};

export default Busd;
  // <label>
      //   Amount in BUSD <span> (How much do I think I can spend?)</span>
      // </label>

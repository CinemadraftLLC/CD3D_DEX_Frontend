import React from "react";
import styles from "../../../styles/buyToke.module.css";
import Typography from "@mui/material/Typography";
import BidPrice from "./components/bidPri";
import BidBUSD from "./components/Busd";
import BidCD3D from "./components/Amount3D";
import Button from "@mui/material/Button";
import Image from "next/image";
import DownA from "../../../public/assets/homepage/down-arrow.svg";

const BuyTokens = () => {
  return (
    <div className={styles.buyTokeOuter}>
      <Typography variant="h5" gutterBottom component="h5">
        Buy Tokens  
      </Typography>
      <BidPrice />
      <BidBUSD />
      <div className={styles.downOuter}>
        <Image src={DownA} alt="Picture of DownArrow" />
      </div>
      <BidCD3D />
      <Button variant="contained">Submit Bid</Button>
    </div>
  );
};

export default BuyTokens;

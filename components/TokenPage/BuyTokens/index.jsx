import React, { useEffect, useState } from "react";
import styles from "../../../styles/buyToke.module.css";
import Typography from "@mui/material/Typography";
import BidPrice from "./components/bidPri";
import BidBUSD from "./components/Busd";
import BidCD3D from "./components/Amount3D";
import Button from "@mui/material/Button";
import Image from "next/image";
import DownA from "../../../public/assets/homepage/down-arrow.svg";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../../hooks/useAuth";
import { Injected } from "../../../constant/constants";
import { getBidPrice } from "../../../utils/utils";
import useCd3d from "../../../hooks/useCD3D";
import { toWei, toGwei } from "../../../utils/utils";
import toast from "react-hot-toast";

const BuyTokens = () => {
  const { active } = useWeb3React();
  const { login } = useAuth();
  const { placeSellOrders, getSampleToken, approveAuctionContract, approved } =
    useCd3d();
  const [busd, setBusd] = useState(0);
  const [cd3d, setcd3d] = useState(0);
  const [bidPrice, setBidPrice] = useState(0);
  const [errMsg, setErrMsg] = useState("");

  const validateBusd = (busd) => {
    if (busd < 10 || !busd) {
      setErrMsg("Minimum amount should not be less than 10!");
      return true;
    } else if (busd > 20000000) {
      setErrMsg("Maximum amount should not be greater than 200,00,000");
      return true;
    }
    setErrMsg("");
    return false;
  };

  useEffect(() => {
    setBidPrice(getBidPrice(busd, cd3d));
  }, [cd3d, busd]);

  const handleChangeOnBusd = (event) => {
    setBusd(event.target.value);
    validateBusd(event.target.value);
  };
  const handleChangeOnCd3d = (event) => {
    setcd3d(event.target.value);
  };

  return (
    <div className={styles.buyTokeOuter}>
      <Typography variant="h5" gutterBottom component="h5">
        Buy Tokens
      </Typography>
      <BidPrice bidPrice={bidPrice} />
      <BidBUSD handleChangeOnBusd={handleChangeOnBusd} errMsg={errMsg} />
      <div className={styles.downOuter}>
        <Image src={DownA} alt="Picture of DownArrow" />
      </div>
      <BidCD3D handleChangeOnCd3d={handleChangeOnCd3d} />

      {active && approved ? (
        <Button
          variant="contained"
          onClick={() => {
            !validateBusd(busd) && placeSellOrders(toGwei(cd3d), toWei(busd));
          }}
        >
          Submit Bid
        </Button>
      ) : active && !approved ? (
        <Button
          variant="contained"
          onClick={() => {
            approveAuctionContract(busd);
          }}
        >
          Approve Token
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            login(Injected);
          }}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default BuyTokens;

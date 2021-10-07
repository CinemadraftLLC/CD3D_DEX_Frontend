import React, { useEffect, useCallback, useState } from "react";
import { usePresale, useBusd } from "./useContract";
import { useWeb3React } from "@web3-react/core";
import { getWeb3NoAccount } from "../utils/web3";
import BigNumber from "bignumber.js";
import { getBidPrice, toHex } from "../utils/utils";
// import toast from "react-hot-toast"
import { toast } from "react-toastify";
import { getPreSaleAddress } from "../helpers/addressHelper";
import { toWei } from "../utils/utils";
import { getData, submitBid } from "../services/services";

function useCD3D() {
  const { active, library, account, error } = useWeb3React();
  const pres_contract = usePresale(library, account);
  const busdContract = useBusd(library, account);
  const [data, setData] = useState();

  const getSampleToken = async () => {
    const token = await busdContract.functions.sendMeUSDToken();
    var interval = setInterval(async () => {
      const receipt = await getWeb3NoAccount().eth.getTransactionReceipt(
        token.hash
      );
      if (receipt) {
        toast.success("Transaction Successful", { toastId: 1 });
        clearInterval(interval);
      }
    }, 100);
  };

  const placeSellOrders = useCallback(
    async (sellTokenAmount, busdAmount) => {
      try {
        const data = {
          address: account,
          environment: "mainnet",
          busd_amount: busdAmount,
          cd3d_amount: sellTokenAmount,
        };
        const req = await submitBid(data);
        setData(req.data);
        const placeBid = await busdContract.functions.transfer(
          "0x570Ea06ADcEB46f592be11A195F705E774d05eD0",
          busdAmount
        );

        var interval = setInterval(async () => {
          const receipt = await getWeb3NoAccount().eth.getTransactionReceipt(
            placeBid.hash
          );
          if (receipt) {
            toast.success("Transaction Successful", { toastId: 1 });
            clearInterval(interval);
          }
        }, 100);
      } catch (err) {
        toast.error(
          "Amount of Busd's in your wallet should be greater or equal to amount of BNB's you are submitting !",
          { toastId: 1 }
        );
      }
    },
    [account, library]
  );

  const fetchData = async () => {
    const req = await getData();
    console.log(req.data);
    setData(req.data);
  };

  useEffect(() => {
    fetchData();
  }, [active]);

  return {
    placeSellOrders,
    getSampleToken,
    data,
  };
}

export default useCD3D;

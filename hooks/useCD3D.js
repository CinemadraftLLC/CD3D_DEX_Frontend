import React, { useEffect, useCallback, useState } from "react";
import { usePresale, useBusd } from "./useContract";
import { useWeb3React } from "@web3-react/core";
import { getWeb3NoAccount } from "../utils/web3";
import BigNumber from "bignumber.js";
import { getBidPrice, toHex } from "../utils/utils";
import toast from "react-hot-toast";
import { getPreSaleAddress } from "../helpers/addressHelper";
import { toWei } from "../utils/utils";

function useCD3D() {
  const { active, library, account, error } = useWeb3React();
  const pres_contract = usePresale(library, account);
  const busdContract = useBusd(library, account);
  const [approved, setApproved] = useState(false);

  const getSampleToken = async () => {
    const token = await busdContract.functions.sendMeUSDToken();
    var interval = setInterval(async () => {
      const receipt = await getWeb3NoAccount().eth.getTransactionReceipt(
        token.hash
      );
      if (receipt) {
        toast.success("Transaction Successful");
        clearInterval(interval);
      }
    }, 100);
  };

  const approveAuctionContract = async (busd) => {
    try {
      const callApprove = await busdContract.functions.approve(
        getPreSaleAddress(),
        toWei(busd)
      );
      setApproved(true);
      let interval = setInterval(async () => {
        const receipt = await getWeb3NoAccount().eth.getTransactionReceipt(
          callApprove.hash
        );
        if (receipt) {
          toast.success(" Approved Successfully! ");
          clearInterval(interval);
        }
      }, 100);
    } catch (err) {
      console.log(err);
      setApproved(false);
      toast.error("Not Approved there is an Error ! ");
    }
  };

  const getAuctionCounter = async () => {
    const auctionCounter = await pres_contract.func;
    return new BigNumber(
      getWeb3NoAccount().utils.fromWei(auctionCounter.toString())
    ).toNumber();
  };

  const placeSellOrders = useCallback(
    async (sellTokenAmount, busdAmount) => {
      try {
        const placeOrder = await pres_contract.functions.placeSellOrders(
          6,
          [`${sellTokenAmount}`],
          [`${busdAmount}`],
          [
            "0x0000000000000000000000000000000000000000000000000000000000000001",
          ],
          "0x"
        );

        var interval = setInterval(async () => {
          const receipt = await getWeb3NoAccount().eth.getTransactionReceipt(
            placeOrder.hash
          );
          if (receipt) {
            toast.success("Transaction Successful");
            clearInterval(interval);
          }
        }, 100);
      } catch (err) {
        console.log(err);
        toast.error(
          "Amount of Busd's in your wallet should be greater or equal to amount of BNB's you are submitting !"
        );
      }
    },
    [account, library]
  );

  useEffect(() => {
    // console.log(getAuctionCounter());
  }, [active]);

  return {
    placeSellOrders,
    getSampleToken,
    approveAuctionContract,
    approved,
  };
}

export default useCD3D;

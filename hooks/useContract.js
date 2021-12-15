import { getPresaleContract, getBusdContract } from "../helpers/ContractHelper";
import { useMemo } from "react";
import Web3 from "web3";

export const usePresale = (library, account) => {
  const web3 = new Web3(library);
  return useMemo(() => getPresaleContract(library, account), [web3]);
};

export const useBusd = (library, account) => {
  const web3 = new Web3(library);
  return useMemo(() => getBusdContract(library, account), [web3]);
};

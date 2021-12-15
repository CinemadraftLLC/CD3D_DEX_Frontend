import PresaleAbi from "../constant/abis/Presale.json";
import BUSDAbi from "../constant/abis/BUSD.json";
import { getPreSaleAddress, getBUSDAddress } from "../helpers/addressHelper";
import { Contract } from "@ethersproject/contracts";

export function getContract(address, ABI, library, account) {
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export const getPresaleContract = (library, account) => {
  return getContract(getPreSaleAddress(), PresaleAbi, library, account);
};

export const getBusdContract = (library, account) => {
  return getContract(getBUSDAddress(), BUSDAbi, library, account);
};

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

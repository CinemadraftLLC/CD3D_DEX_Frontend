import { Addresses } from "../constant/constants";
export const getAddress = (address) => {
  // const chainId = 97;
  const chainId = 56;

  return address[chainId];
};

export const getPreSaleAddress = () => {
  return getAddress(Addresses.presale);
};

export const getBUSDAddress = () => {
  return getAddress(Addresses.busd);
};

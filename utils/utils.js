import { getWeb3NoAccount } from "../utils/web3";

export const toHex = (amount) => {
  return getWeb3NoAccount().utils.toHex(amount);
};

export const toWei = (amount) => {
  return getWeb3NoAccount().utils.toWei(amount.toString());
};

export const toGwei = (amount) => {
  return getWeb3NoAccount().utils.toWei(amount.toString(), "gwei");
};

export const getBidPrice = (busd = 0, cd3d = 0) => {
  const bidPrice = busd / cd3d;
  return bidPrice.toFixed(2);
};

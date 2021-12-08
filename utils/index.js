import { getAddress } from '@ethersproject/address'
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { ChainId, JSBI, Percent, Token, CurrencyAmount, Currency, ETHER } from 'cd3d-dex-libs-sdk'

import { getWeb3NoAccount } from "./web3";

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

export function isAddress(value) {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

const BSCSCAN_PREFIXES = {
  56: '',
  97: 'testnet.'
}

export function getBscScanLink(chainId, data, type) {
  const prefix = `https://${BSCSCAN_PREFIXES[chainId] || BSCSCAN_PREFIXES[ChainId.MAINNET]}bscscan.com`

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

import { InjectedConnector } from "@web3-react/injected-connector";
import {Web3Provider} from "@ethersproject/providers";
import NetworkConnector from "./NetworkConnector";


const NETWORK_URL = process.env.REACT_APP_NETWORK_URL

export const NETWORK_CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID ?? '56')

export const injected = new InjectedConnector({
  supportedChainIds: [97, 56],
});

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
})

let networkLibrary
export function getNetworkLibrary() {
  // eslint-disable-next-line no-return-assign
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider))
}


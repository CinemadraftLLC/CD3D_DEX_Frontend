import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { simpleRpcProvider } from "../utils/web3";

const useActiveWeb3React = () => {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setProvider] = useState(library || simpleRpcProvider);

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider);
      refEth.current = library;
    }
  }, [library]);

  return {
    library: provider,
    chainId: chainId ?? 56,
    ...web3React,
  };
};

export default useActiveWeb3React;

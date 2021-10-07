import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectorsByName } from "../constant/constants";
import getErrorMessage from "../utils/errorHelper";
import toast from "react-hot-toast";

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const login = useCallback((connectorID) => {
    const connector = connectorsByName[connectorID];

    if (connector) {
      activate(connector, async (error) => {
        toast.error(getErrorMessage(error));
      });
    } else {
      toast.error("Can't find connector The connector config is wrong");
    }
  }, []);

  return { login, logout: deactivate };
};

export default useAuth;

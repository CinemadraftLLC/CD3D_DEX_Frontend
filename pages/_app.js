import { Provider } from 'react-redux'
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Web3ReactManager from "../Web3Manager/Web3Manager";
// import { Toaster } from "react-hot-toast";
import ApplicationUpdater from '../state/application/updater'
import ListsUpdater from '../state/lists/updater'
import MulticallUpdater from '../state/multicall/updater'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import store from '../state'
import "../styles/globals.css";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ToastContainer />
      <Web3ReactManager>
          <Provider store={store}>
              <>
                  <ListsUpdater />
                  <ApplicationUpdater />
                  <MulticallUpdater />
              </>
            <Component {...pageProps} />
          </Provider>
      </Web3ReactManager>
    </Web3ReactProvider>
  );
}

export default MyApp;

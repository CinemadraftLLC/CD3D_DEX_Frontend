import {Provider} from 'react-redux'
import {Web3ReactProvider} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import Web3ReactManager from "../Web3Manager/Web3Manager";
// import { Toaster } from "react-hot-toast";
import ApplicationUpdater from '../state/application/updater'
import ListsUpdater from '../state/lists/updater'
import MulticallUpdater from '../state/multicall/updater'
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import store from '../state'
import "../styles/globals.css";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {styled, Stack, CssBaseline, Box} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/footer";
import React from "react";

function getLibrary(provider) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
}

function MyApp({Component, pageProps}) {
    const theme = createTheme();
    const Offset = styled('div')(({theme}) => theme.mixins.toolbar);
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <ToastContainer/>
            <Web3ReactManager>
                <Provider store={store}>
                    <>
                        <ListsUpdater/>
                        <ApplicationUpdater/>
                        <MulticallUpdater/>
                    </>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <Box sx={{height: '100vh'}}>
                            <Stack direction={"column"} sx={{width: "100%", height: "100%"}}>
                                <Header/>
                                <Offset/>
                                <Box component={"div"} className={"main-container"}>
                                    <Component {...pageProps} />
                                </Box>
                                <Box sx={{height: "63px"}}/>
                                <Footer/>
                            </Stack>
                        </Box>
                    </ThemeProvider>
                </Provider>
            </Web3ReactManager>
        </Web3ReactProvider>
    );
}

export default MyApp;

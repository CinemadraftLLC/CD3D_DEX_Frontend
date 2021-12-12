import {styled} from '@mui/material/styles';
import ChartContainer from "../../components/CustomChart";
import {Container, Grid, Stack, Box, FormControl, InputLabel, InputAdornment, IconButton, Slide, TextField, Button,} from "@mui/material";
import {Typography} from "@material-ui/core";
import LoopIcon from '@mui/icons-material/Loop';
import React, {useCallback, useState} from "react";
import Image from 'next/image';
import DownA from '../../public/assets/homepage/down-arrow.svg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormSubmitBtn from "../../components/Form/FormSubmitBtn";
import FormLabel from "../../components/Form/FormLabel";
import FormAdvancedTextField from "../../components/Form/FormAdvancedTextField";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import SwapTokenItem from "../../components/Swap/SwapTokenItem";
import SwapEndAdornment from "../../components/Swap/SwapEndAdornment";


const SwapContainer = styled(Container)({
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: '15px',
    padding: '50px 10px',
    backdropFilter: "blur(30px)",
    position: "relative",
    overflow: "hidden",
})

const PayTokenContainer = styled(Box)({
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    padding: "20px",
    borderRadius: '15px',
    backgroundColor: '#1D162D',
    backdropFilter: "blur(30px)",
})

const ReceiveTokenContainer = styled(Box)({
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    padding: "20px",
    borderRadius: '15px',
    backgroundColor: '#1D162D',
    backdropFilter: "blur(30px)",
})

const TokenSearchTextField = styled((props) => (
    <TextField
        variant="filled"
        fullWidth={true}
        size={"medium"}
        {...props}
    />
))(({theme}) => ({
    '& .MuiFilledInput-root': {
        overflow: 'hidden',
        borderRadius: "12px",
        marginTop: "20px",
        marginBottom: "30px",
        color: "white",
        backgroundColor: '#231e3d',
        backdropFilter: "blur(30px)",
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),

        '.MuiInputAdornment-root': {
            '.MuiTypography-subtitle1': {
                color: "#ffffff",
            }
        }
    },
    '.MuiFilledInput-input': {
        padding: "14px",
    },
    '.MuiFormHelperText-root': {
        color: '#7689B0',
        fontSize: "14px",
        marginLeft: "4px",
    },
}));


const Swap = () => {

    const [payShow, setPayShow] = useState(false);
    const [receiveShow, setReceiveShow] = useState(false);
    const swapContainerRef = React.useRef(null);

    const [payToken, setPayToken] = useState("busd");
    const [receiveToken, setReceiveToken] = useState("cd3d");

    const payTokenChangeHandler = (val) => {
        setPayToken(val);
        setPayShow(false);
    }

    const receiveTokenChangeHandler = (val) => {
        setReceiveToken(val);
        setReceiveShow(false);
    }

    return (
        <Stack mt={{xs: 2, sm: 2, md: 3, lg: 5}}>
            <Grid container spacing={{xs: 2, md: 3}}>
                <Grid item xs={12} sm={12} md={12} xl={8}>
                    <ChartContainer/>
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={4}>
                    <SwapContainer ref={swapContainerRef}>
                        <Box component={"form"} autoComplete={"off"} noValidate>
                            <FormControl variant={"standard"} fullWidth={true}>
                                <InputLabel shrink htmlFor={"swap_pay"}>
                                    <FormLabel title={"Pay"} description={"(Currency you send)"} required={false}/>
                                </InputLabel>
                                <FormAdvancedTextField
                                    id={"swap_pay"}
                                    helperText={
                                        <Stack component={"span"} direction={"row"} justifyContent={"space-between"}>
                                            <Typography component={'span'} variant={"body2"}>Approx. $5.00</Typography>
                                            <Typography component={'span'} variant={"body2"}>Min. Buy $10.00</Typography>
                                        </Stack>
                                    }
                                    InputProps={{
                                        disableUnderline: true,
                                        endAdornment: <InputAdornment position="end">
                                            <SwapEndAdornment value={payToken} onClick={() => setPayShow(true)}/>
                                        </InputAdornment>,
                                    }}
                                />
                            </FormControl>
                            <Box sx={{
                                height: "120px",
                            }}>
                                <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} sx={{
                                    height: "100%"
                                }}>
                                    <Image src={DownA} alt='Picture of DownArrow' width={"30px"} height={"30px"}/>
                                </Stack>
                            </Box>
                            <FormControl variant={"standard"} fullWidth={true}>
                                <InputLabel shrink htmlFor={"swap_receive"}>
                                    <FormLabel title={"Receive"} description={"(Currency you get)"} required={false}/>
                                </InputLabel>
                                <FormAdvancedTextField
                                    id={"swap_receive"}
                                    helperText={
                                        <Stack component={"span"} direction={"row"} justifyContent={"center"}>
                                            <Typography component={'span'} variant={"body2"}>1 CD3D = 0.00127 BUSD</Typography>
                                            <IconButton color="primary" aria-label="Refresh" size={"small"}>
                                                <LoopIcon fontSize={"small"}/>
                                            </IconButton>
                                        </Stack>
                                    }
                                    InputProps={{
                                        disableUnderline: true,
                                        endAdornment: <InputAdornment position="end">
                                            <SwapEndAdornment value={receiveToken} onClick={() => setReceiveShow(true)}/>
                                        </InputAdornment>,
                                    }}
                                />
                            </FormControl>
                            <Box sx={{height: "80px"}}/>
                            <FormSubmitBtn label={"BUY CD3D"} loading={false} onSubmit={() => {
                            }}/>
                        </Box>
                        <Slide direction={"left"} in={payShow} container={swapContainerRef.current}>
                            <PayTokenContainer>
                                <Stack component={"div"} direction={"column"}>
                                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                                        <IconButton color="secondary" aria-label="add an alarm" onClick={() => setPayShow(false)}>
                                            <ArrowBackIcon sx={{color: "#75E4AA"}}/>
                                        </IconButton>
                                        <Typography component={'span'} variant={"subtitle1"} style={{marginLeft: "20px", color: "#75E4AA", fontSize: "18px"}}>Pay Token</Typography>
                                    </Stack>
                                    <TokenSearchTextField
                                        variant={"filled"}
                                        fullWidth={true}
                                        size={"medium"}
                                        placeholder={"Enter the token symbol or address"}
                                        InputProps={{
                                            disableUnderline: true,
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton aria-label="Refresh" size={"small"} sx={{padding: "7px", borderRadius: "12px", backgroundColor: "#800022"}}>
                                                    <SearchIcon fontSize={"small"} style={{color: "white"}}/>
                                                </IconButton>
                                            </InputAdornment>,
                                        }}/>
                                    <SwapTokenItem value={"bnb"} disabled={payToken === "bnb"} onChange={(val) => payTokenChangeHandler(val)}/>
                                    <SwapTokenItem value={"busd"} disabled={payToken === "busd"} onChange={(val) => payTokenChangeHandler(val)}/>
                                    <SwapTokenItem value={"cd3d"} disabled={payToken === "cd3d"} onChange={(val) => payTokenChangeHandler(val)}/>
                                </Stack>
                            </PayTokenContainer>
                        </Slide>
                        <Slide direction={"left"} in={receiveShow} container={swapContainerRef.current}>
                            <ReceiveTokenContainer>
                                <Stack component={"div"} direction={"column"}>
                                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                                        <IconButton color="secondary" aria-label="add an alarm" onClick={() => setReceiveShow(false)}>
                                            <ArrowBackIcon sx={{color: "#75E4AA"}}/>
                                        </IconButton>
                                        <Typography component={'span'} variant={"subtitle1"} style={{marginLeft: "20px", color: "#75E4AA", fontSize: "18px"}}>Receove Token</Typography>
                                    </Stack>
                                    <TokenSearchTextField
                                        variant={"filled"}
                                        fullWidth={true}
                                        size={"medium"}
                                        placeholder={"Enter the token symbol or address"}
                                        InputProps={{
                                            disableUnderline: true,
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton aria-label="Refresh" size={"small"} sx={{padding: "7px", borderRadius: "12px", backgroundColor: "#800022"}}>
                                                    <SearchIcon fontSize={"small"} style={{color: "white"}}/>
                                                </IconButton>
                                            </InputAdornment>,
                                        }}/>
                                    <SwapTokenItem value={"bnb"} disabled={receiveToken === "bnb"} onChange={(val) => receiveTokenChangeHandler(val)}/>
                                    <SwapTokenItem value={"busd"} disabled={receiveToken === "busd"} onChange={(val) => receiveTokenChangeHandler(val)}/>
                                    <SwapTokenItem value={"cd3d"} disabled={receiveToken === "cd3d"} onChange={(val) => receiveTokenChangeHandler(val)}/>
                                </Stack>
                            </ReceiveTokenContainer>
                        </Slide>
                    </SwapContainer>
                </Grid>
            </Grid>
        </Stack>
    );
}
export default Swap;
import {styled} from '@mui/material/styles';
import ChartContainer from "../../components/CustomChart";
import {Container, Grid, Stack, Box, FormControl, InputLabel, InputAdornment, IconButton, Slide,} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Typography} from "@material-ui/core";
import LoopIcon from '@mui/icons-material/Loop';
import React, {useCallback, useState} from "react";
import Image from 'next/image';
import DownA from '../../public/assets/homepage/down-arrow.svg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormSubmitBtn from "../../components/Form/FormSubmitBtn";
import FormLabel from "../../components/Form/FormLabel";
import FormAdvancedTextField from "../../components/Form/FormAdvancedTextField";


const SwapContainer = styled(Container)({
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '15px',
    padding: '50px 10px',
    backdropFilter: "blur(30px)",
    position: "relative",
})

const Swap = () => {
    const onPayChange = useCallback(() => {
        setPayShow(!payShow);
    });

    const onReceiveChange = useCallback(() => {
        console.log("onReceiveChange");
    });

    const [payShow, setPayShow] = useState(false);
    return (
        <Stack mt={{xs: 2, sm: 2, md: 3, lg: 5}}>
            <Grid container spacing={{xs: 2, md: 3}}>
                <Grid item xs={12} sm={12} md={12} xl={8}>
                    <ChartContainer/>
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={4}>
                    <SwapContainer>
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
                                            <Stack direction={"row"} alignItems={"center"} onClick={onPayChange}>
                                                <Typography component={'span'} variant="subtitle1">CD3D</Typography>
                                                <Box sx={{width: "22px", height: "22px", marginLeft: "7px"}}>
                                                    <Image src={"/assets/images/cd3d.png"} width={22} height={22} objectFit={"contain"}/>
                                                </Box>
                                                <ArrowDropDownIcon fontSize={"small"} sx={{color: "white"}}/>
                                            </Stack>
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
                                            <Stack direction={"row"} alignItems={"center"} onClick={onReceiveChange}>
                                                <Typography component={'span'} variant="subtitle1">CD3D</Typography>
                                                <Box sx={{width: "22px", height: "22px", marginLeft: "7px"}}>
                                                    <Image src={"/assets/images/busd.png"} width={22} height={22} objectFit={"contain"}/>
                                                </Box>
                                                <ArrowDropDownIcon fontSize={"small"} sx={{color: "white"}}/>
                                            </Stack>
                                        </InputAdornment>,
                                    }}
                                />
                            </FormControl>
                            <Box sx={{height: "80px"}}/>
                            <FormSubmitBtn label={"BUY CD3D"} loading={false} onSubmit={() => {
                            }}/>
                        </Box>
                    </SwapContainer>
                </Grid>
            </Grid>
        </Stack>
    );
}
export default Swap;
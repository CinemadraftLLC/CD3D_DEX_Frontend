import React from 'react';
import {Box, Stack, Typography, Grid} from "@mui/material";
import {styled} from "@mui/material/styles";
import {LiquidityContainer, LiquidityLabel, LiquidityTitleBox, MaxButton, PercentButton, ReceiveContainer} from "../widgets/liquidity_widget";
import ClearFix from "../../../components/ClearFix/ClearFix";
import FormAdvancedTextField from "../../../components/Form/FormAdvancedTextField";
import Image from "next/image";
import PlusIcon from '../../../public/assets/plusIcon.svg';
import FormSubmitBtn from "../../../components/Form/FormSubmitBtn";

const LiquidityPost = styled(Box)({
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: '15px',
    padding: "30px",

    backdropFilter: "blur(30px)",
    position: "relative",
    overflow: "hidden",
    '& .MuiTypography-subtitle1': {
        color: "#BAC4D7",
        fontSize: "14px",
        textAlign: "center",
        lineHeight: "32px",
        display: "block",
    }
});


const LiquidityRemove = () => {
    const liquidityRemoveContainerRef = React.useRef(null);
    return (
        <Box sx={{width: "100%"}}>
            <LiquidityContainer ref={liquidityRemoveContainerRef}>
                <LiquidityTitleBox>
                    <Typography component={"span"} variant={"subtitle1"}>Remove Liquidity</Typography>
                    {
                        <Box>
                            <Typography component={"span"} variant={"subtitle2"}>Enter amount to remove liquidity</Typography>
                        </Box>
                    }
                </LiquidityTitleBox>
                <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    spacing={1}
                >
                    <ClearFix height={15}/>
                    <LiquidityLabel shrink htmlFor={"daily_reward"}>
                        <Typography variant={"subtitle1"} component={"label"}>Amount to Remove</Typography>
                    </LiquidityLabel>
                    <FormAdvancedTextField
                        id={"amount_remove"}
                        InputProps={{
                            type: 'number',
                            placeholder: '0',
                            min: '0',
                            onChange: (_) => {
                            },
                            disableUnderline: true,
                            value: "",
                            endAdornment: <Typography component={"span"} variant={"subtitle1"}>%</Typography>,
                        }}
                    />
                    <Stack
                        direction={"row"}
                        justifyContent={"start"}
                        alignItems={"center"}
                        spacing={1}
                        sx={{marginTop: "5px", padding: "0 10px"}}
                    >
                        <PercentButton variant={"outlined"} size={"large"}>
                            25%
                        </PercentButton>
                        <PercentButton variant={"outlined"} size={"large"}>
                            50%
                        </PercentButton>
                        <PercentButton variant={"outlined"} size={"large"}>
                            75%
                        </PercentButton>
                        <MaxButton variant={"outlined"} size={"large"}>
                            Max
                        </MaxButton>
                    </Stack>
                    <ClearFix height={30}/>
                    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} sx={{height: "100%"}}>
                        <Image src={PlusIcon} alt='Picture of DownArrow'/>
                    </Stack>
                    <ClearFix height={30}/>
                    <LiquidityLabel shrink>
                        <Typography variant={"subtitle1"} component={"label"}>You will receive</Typography>
                    </LiquidityLabel>
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        spacing={1}
                    >
                        <ReceiveContainer>
                            <Stack
                                direction={"row"} justifyContent={"space-between"} alignItems={"center"}
                            >
                                <Typography variant={"subtitle1"} component={"span"}>-</Typography>
                                <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={1}>
                                    <Typography variant={"subtitle2"} component={"span"}>BUSD</Typography>
                                    <Image src={"/assets/images/busd.png"} width={22} height={22} objectFit={"contain"}/>
                                </Stack>
                            </Stack>
                        </ReceiveContainer>
                        <ReceiveContainer>
                            <Stack
                                direction={"row"} justifyContent={"space-between"} alignItems={"center"}
                            >
                                <Typography variant={"subtitle1"} component={"span"}>-</Typography>
                                <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
                                    <Typography variant={"subtitle2"} component={"span"}>CD3D</Typography>
                                    <Image src={"/assets/images/cd3d.png"} width={22} height={22} objectFit={"contain"}/>
                                </Stack>
                            </Stack>
                        </ReceiveContainer>
                    </Stack>
                    <ClearFix height={20}/>
                    <Stack
                        direction={"row"} justifyContent={"space-between"} alignItems={"center"}
                    >
                        <Typography variant={"subtitle1"} component={"span"} sx={{color: "#FFFFFF", fontSize: "14px"}}>Current Rate</Typography>
                        <Typography variant={"subtitle1"} component={"span"} sx={{color: "#FFFFFF", fontSize: "14px"}}>6535.435 CD3D/BUSD</Typography>
                    </Stack>
                    <ClearFix height={10}/>
                    <FormSubmitBtn
                        label={"Approve"}
                        disabled={false}
                        fullWidth={true}
                        onSubmit={() => {
                        }}
                    />
                </Stack>
            </LiquidityContainer>
            <ClearFix height={15}/>
            <LiquidityPost>
                <Typography component={"span"} variant={"subtitle1"}>
                    Add liquidity to earn 0.17% of all trades on this trading pair, relative to your portion of the pool. You may claim your real-time accrued
                    fees added to the pool by withdrawing your liquidity.
                </Typography>
            </LiquidityPost>
            <ClearFix height={100}/>
        </Box>
    );
}
export default LiquidityRemove;
import React from "react";
import {Typography} from "@material-ui/core";
import {Box, Stack} from "@mui/material";
import Image from "next/image";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SwapEndAdornment = (props) => {
    const {value, onClick} = props;

    const getImage = (val) => {
        let result = "assets/images/cd3d.png";
        switch (val.toLowerCase()) {
            case "bnb":
                result = "/assets/images/bnb.png";
                break;
            case "busd":
                result = "/assets/images/busd.png";
                break;
            case "cd3d":
                result = "/assets/images/cd3d.png";
                break;
        }
        return result;
    }

    return (
        <Stack direction={"row"} alignItems={"center"} style={{cursor: "pointer"}} onClick={() => onClick()}>
            <Typography component={'span'} variant="subtitle1">{value.toUpperCase()}</Typography>
            <Box sx={{width: "22px", height: "22px", marginLeft: "7px"}}>
                <Image src={getImage(value)} width={22} height={22} objectFit={"contain"}/>
            </Box>
            <ArrowDropDownIcon fontSize={"small"} sx={{color: "white"}}/>
        </Stack>
    );

}
export default SwapEndAdornment;
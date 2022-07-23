import { Box, IconButton, InputAdornment, Slide, Stack, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography } from "@material-ui/core";
import styles from "../../styles/swap.module.css";
import SearchIcon from "@mui/icons-material/Search";
import SwapTokenItem from "./SwapTokenItem";
import SwapTokenItemImport from "./SwapTokenItemImport"
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { NETWORK_CHAIN_ID } from "../../connectors";
import { useAllTokens, useToken } from "../../hooks/Tokens";
import { isAddress } from "../../utils";
import { Token } from "cd3d-dex-libs-sdk";


const TokenSelectContainer = styled(Box)({
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    padding: "20px",
    borderRadius: '15px',
    backgroundColor: '#1A1020',
    backdropFilter: "blur(30px)",
})

const TokenSearchTextField = styled((props) => (
    <TextField
        variant="filled"
        fullWidth={true}
        size={"medium"}
        {...props}
    />
))(({ theme }) => ({
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

export const TokenSelect = ({ label, container, show, onClose, onSelect, tokenList, disabledTokens = [] }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const searchToken = useToken(searchQuery)

    const [filteredTokenList, setFilterTokenList] = useState(tokenList[NETWORK_CHAIN_ID])
    const userTokens = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("tokens")) || [] : []
    const allTokens = [...tokenList[NETWORK_CHAIN_ID], ...userTokens.map((token) => new Token(NETWORK_CHAIN_ID, token.address, token.decimals, token.symbol, token.name))]

    const handleChangeInput = (event) => {
        const filterTokens = allTokens.filter((token) => {
            return token.symbol.toUpperCase().search(event.target.value.toUpperCase()) >= 0 || token.address === event.target.value
        })
        setFilterTokenList(filterTokens)
        setSearchQuery(event.target.value)
    }
    return (
        <Slide direction={"left"} in={show} container={container}>
            <TokenSelectContainer>
                <Stack component={"div"} direction={"column"}>
                    <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
                        <IconButton color="secondary" aria-label="add an alarm" onClick={onClose}>
                            <ArrowBackIcon sx={{ color: "#75E4AA" }} />
                        </IconButton>
                        <Typography component={'span'} variant={"subtitle1"} style={{ marginLeft: "20px", color: "#75E4AA", fontSize: "18px" }}>{label}</Typography>
                    </Stack>
                    <TokenSearchTextField
                        variant={"filled"}
                        fullWidth={true}
                        size={"medium"}
                        onChange={handleChangeInput}
                        placeholder={"Enter the token symbol or address"}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: <InputAdornment position="end">
                                <IconButton className={styles.swapSearchIcon} aria-label="Refresh" size={"small"}>
                                    <SearchIcon fontSize={"small"} style={{ color: "white" }} />
                                </IconButton>
                            </InputAdornment>,
                        }} />
                    {(searchQuery !== "" ? filteredTokenList : allTokens).map((token, index) => <SwapTokenItem key={index} value={token} disabled={disabledTokens.includes(token.symbol)} onChange={() => { onSelect(token); setSearchQuery("") }} />)}
                    {searchToken && !filteredTokenList.length && <SwapTokenItemImport key={searchToken.symbol} value={searchToken} disabled={disabledTokens.includes(searchToken.symbol)} onChange={() => { onSelect(searchToken); setSearchQuery("") }} />}
                </Stack>
            </TokenSelectContainer>
        </Slide>
    );
}

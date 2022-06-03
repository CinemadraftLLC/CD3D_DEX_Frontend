import React from 'react'
import PropTypes from 'prop-types'
import { CreateTokenBigLabel, CreateTokenFormControl, CreateTokenSpanTitle, CreateTokenFormLabel, CreateTokenSelect, CreateTokenSmallLabel, CreateTokenSpan } from "./create_token_widget";
import { Box, FormControlLabel, Grid, Stack } from "@mui/material";
import ClearFix from "../ClearFix/ClearFix";
import CreateTokenTextForm from "../CreateTokenSales/CreateTokenTextForm";

function AdvancedSetting({ advancedSetting }) {
  return (
    <Box hidden={!advancedSetting}>
      <ClearFix height={50} />
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <CreateTokenFormLabel>Features</CreateTokenFormLabel>
        <FormControlLabel control={<CreateTokenSelect />} label="Burn" sx={{ color: "#EAFBF3" }} />
        <FormControlLabel control={<CreateTokenSelect />} label="Mintable" sx={{ color: "#EAFBF3" }} />
        <FormControlLabel control={<CreateTokenSelect />} label="Deflation" sx={{ color: "#EAFBF3" }} />
        <FormControlLabel control={<CreateTokenSelect />} label="Advanced Tokenomics" sx={{ color: "#EAFBF3" }} />
      </Stack>
      <ClearFix height={50} />
      <CreateTokenSpanTitle>Tax Wallet Settings</CreateTokenSpanTitle>
      <ClearFix height={50} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <CreateTokenFormLabel>Dev Wallet</CreateTokenFormLabel>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                placeholder: "eg: 0x111111111111",
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CreateTokenFormLabel>Marketing Wallet</CreateTokenFormLabel>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                placeholder: "eg: 0x111111111111",
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Grid>
      </Grid>
      <ClearFix height={50} />
      <CreateTokenFormLabel>Charity Wallet</CreateTokenFormLabel>
      <ClearFix height={10} />
      <CreateTokenFormControl>
        <CreateTokenTextForm
          InputProps={{
            placeholder: "eg: 0x111111111111",
            disableUnderline: true,
          }}
        />
      </CreateTokenFormControl>
      <ClearFix height={50} />
      <CreateTokenSpanTitle>Buy Tax</CreateTokenSpanTitle>
      <ClearFix height={50} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <CreateTokenFormLabel>Dev Tax Buy(%)</CreateTokenFormLabel>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                value: "1",
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CreateTokenFormLabel>Marketing Tax Buy(%)</CreateTokenFormLabel>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                value: "1",
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Grid>
      </Grid>
      <ClearFix height={50} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <CreateTokenFormLabel>Charity Tax Buy(%)</CreateTokenFormLabel>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                value: "1",
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CreateTokenFormLabel>Liquidity Tax Buy(%)</CreateTokenFormLabel>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                value: "2",
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Grid>
      </Grid>
      <ClearFix height={50} />
      <CreateTokenSpanTitle>Sell Tax</CreateTokenSpanTitle>
      <ClearFix height={50} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <CreateTokenFormLabel>Dev Tax Sell(%)</CreateTokenFormLabel>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                value: "1",
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CreateTokenFormLabel>Marketing Tax Sell(%)</CreateTokenFormLabel>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                value: "1",
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Grid>
      </Grid>
      <ClearFix height={50} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <CreateTokenFormLabel>Charity Tax Sell(%)</CreateTokenFormLabel>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                value: "1",
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CreateTokenFormLabel>Liquidity Tax Sell(%)</CreateTokenFormLabel>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                value: "3",
              }}
            />
          </CreateTokenFormControl>
        </Grid>
      </Grid>
      <ClearFix height={70} />
      <CreateTokenSmallLabel color={"#75E4AA"}>Buy Fee</CreateTokenSmallLabel>
      <ClearFix height={30} />
      <Stack direction={"row"} alignItems={"center"}>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={"#75E4AA"}>5%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Fee</CreateTokenSmallLabel>
        </Stack>
        <CreateTokenSpan>=</CreateTokenSpan>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={"#75E4AA"}>1%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Development</CreateTokenSmallLabel>
        </Stack>
        <CreateTokenSpan>+</CreateTokenSpan>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={"#75E4AA"}>1%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Marketing</CreateTokenSmallLabel>
        </Stack>
        <CreateTokenSpan>+</CreateTokenSpan>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={"#75E4AA"}>1%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Charity</CreateTokenSmallLabel>
        </Stack>
        <CreateTokenSpan>+</CreateTokenSpan>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={"#75E4AA"}>2%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Liquidity</CreateTokenSmallLabel>
        </Stack>
      </Stack>
      <ClearFix height={70} />
      <CreateTokenSmallLabel color={"#FF0144"}>Sell Fee</CreateTokenSmallLabel>
      <ClearFix height={30} />
      <Stack direction={"row"} alignItems={"center"}>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={"#FF0144"}>6%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Fee</CreateTokenSmallLabel>
        </Stack>
        <CreateTokenSpan>=</CreateTokenSpan>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={"#FF0144"}>1%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Development</CreateTokenSmallLabel>
        </Stack>
        <CreateTokenSpan>+</CreateTokenSpan>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={"#FF0144"}>1%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Marketing</CreateTokenSmallLabel>
        </Stack>
        <CreateTokenSpan>+</CreateTokenSpan>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={"#FF0144"}>1%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Charity</CreateTokenSmallLabel>
        </Stack>
        <CreateTokenSpan>+</CreateTokenSpan>
        <Stack direction={"column"} marginLeft={"40px"} justifyContent={"center"} alignItems={"center"}>
          <CreateTokenBigLabel color={"#FF0144"}>3%</CreateTokenBigLabel>
          <CreateTokenSmallLabel color={"transparent"}>Liquidity</CreateTokenSmallLabel>
        </Stack>
      </Stack>
      <ClearFix height={50} />
      <CreateTokenFormLabel>LP SWAP</CreateTokenFormLabel>
      <ClearFix height={10} />
      <CreateTokenFormControl>
        <CreateTokenTextForm
          InputProps={{
            value: "CD3D DEX",
            disableUnderline: true,
          }}
        />
      </CreateTokenFormControl>
    </Box>
  )
}

AdvancedSetting.propTypes = {
  advancedSetting: PropTypes.bool.isRequired,
}

export default AdvancedSetting

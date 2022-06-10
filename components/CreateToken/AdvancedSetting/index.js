import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CreateTokenBigLabel, CreateTokenFormControl, CreateTokenSpanTitle, CreateTokenFormLabel, CreateTokenSelect, CreateTokenSmallLabel, CreateTokenSpan } from "../create_token_widget";
import { Box, FormControlLabel, Grid, Stack } from "@mui/material";
import ClearFix from "../../ClearFix/ClearFix";
import CreateTokenTextForm from "../../CreateTokenSales/CreateTokenTextForm";
import TaxPercent from '../TaxPercentage/TaxPercentage';

function AdvancedSetting({ advancedSetting, settingStep }) {

  const [buyTaxArray, setBuyTaxArray] = useState([1, 1, 1, 2])
  const [sellTaxArray, setSellTaxArray] = useState([1, 1, 1, 3])

  const buyTaxHandle = (e, i) => {
    setBuyTaxArray(prev => {
      let temp = prev.map(item => item)
      temp[i] = parseInt(e.target.value) || 0
      return temp
    })
  }

  const sellTaxHandle = (e, i) => {
    setSellTaxArray(prev => {
      let temp = prev.map(item => item)
      temp[i] = parseInt(e.target.value) || 0
      return temp
    })
  }

  return (
    <Box hidden={!advancedSetting}>
      <Box hidden={!settingStep}>
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
                  value: buyTaxArray[0],
                }}
                onChange={(e) => buyTaxHandle(e, 0)}
              />
            </CreateTokenFormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CreateTokenFormLabel>Marketing Tax Buy(%)</CreateTokenFormLabel>
            <ClearFix height={10} />
            <CreateTokenFormControl>
              <CreateTokenTextForm
                InputProps={{
                  value: buyTaxArray[1],
                }}
                onChange={(e) => buyTaxHandle(e, 1)}
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
                  value: buyTaxArray[2],
                }}
                onChange={(e) => buyTaxHandle(e, 2)}
              />
            </CreateTokenFormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CreateTokenFormLabel>Liquidity Tax Buy(%)</CreateTokenFormLabel>
            <ClearFix height={10} />
            <CreateTokenFormControl>
              <CreateTokenTextForm
                InputProps={{
                  value: buyTaxArray[3],
                }}
                onChange={(e) => buyTaxHandle(e, 3)}
              />
            </CreateTokenFormControl>
          </Grid>
        </Grid>
        <ClearFix height={50} />
        <CreateTokenSpanTitle>Sell Tax</CreateTokenSpanTitle>
        <ClearFix height={50} />
        <TaxPercent fontColor="#75E4AA" taxPercent={buyTaxArray} text="Buy Fee" />
        <ClearFix height={70} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <CreateTokenFormLabel>Dev Tax Sell(%)</CreateTokenFormLabel>
            <ClearFix height={10} />
            <CreateTokenFormControl>
              <CreateTokenTextForm
                InputProps={{
                  value: sellTaxArray[0],
                }}
                onChange={(e) => sellTaxHandle(e, 0)}
              />
            </CreateTokenFormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CreateTokenFormLabel>Marketing Tax Sell(%)</CreateTokenFormLabel>
            <ClearFix height={10} />
            <CreateTokenFormControl>
              <CreateTokenTextForm
                InputProps={{
                  value: sellTaxArray[1],
                }}
                onChange={(e) => sellTaxHandle(e, 1)}
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
                  value: sellTaxArray[2],
                }}
                onChange={(e) => sellTaxHandle(e, 2)}
              />
            </CreateTokenFormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CreateTokenFormLabel>Liquidity Tax Sell(%)</CreateTokenFormLabel>
            <ClearFix height={10} />
            <CreateTokenFormControl>
              <CreateTokenTextForm
                InputProps={{
                  value: sellTaxArray[3],
                }}
                onChange={(e) => sellTaxHandle(e, 3)}
              />
            </CreateTokenFormControl>
          </Grid>
        </Grid>

        <ClearFix height={70} />
        <TaxPercent fontColor="#FF0144" taxPercent={sellTaxArray} text="Sell Fee" />
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
    </Box>
  )
}

AdvancedSetting.propTypes = {
  advancedSetting: PropTypes.bool.isRequired,
}

export default AdvancedSetting

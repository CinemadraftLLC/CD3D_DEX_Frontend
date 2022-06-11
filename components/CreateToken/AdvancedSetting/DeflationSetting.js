import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CreateTokenBigLabel, CreateTokenFormControl, CreateTokenSpanTitle, CreateTokenFormLabel, CreateTokenSelect, CreateTokenSmallLabel, CreateTokenSpan } from "../create_token_widget";
import { Box, FormControlLabel, FormGroup, Grid, Stack, Switch, Typography } from "@mui/material";
import ClearFix from "../../ClearFix/ClearFix";
import CreateTokenTextForm from "../../CreateTokenSales/CreateTokenTextForm";
import TaxPercent from '../TaxPercentage/TaxPercentage';

function DeflationSetting({ settingStep }) {

  const [buyBackStatus, setBuyBackStatus] = useState(false)
  const [holderRewardStatus, setHolderRewardStatus] = useState(false)
  const [lpStatus, setLpStatus] = useState(false)

  const buyBackHandle = () => {
    setBuyBackStatus(prev => !prev)
  }

  const holderHandle = () => {
    setHolderRewardStatus(prev => !prev)
  }

  const automaticLpHandle = () => {
    setLpStatus(prev => !prev)
  }
  return (
    <Box hidden={settingStep} sx={{ paddingX: "30px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <CreateTokenFormLabel>Transaction Tax (%)</CreateTokenFormLabel>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                type: "number",
              }}
            />
          </CreateTokenFormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CreateTokenFormLabel>Burn Fee (%)</CreateTokenFormLabel>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                type: "number",
              }}
            />
          </CreateTokenFormControl>
        </Grid>
      </Grid>
      <ClearFix height={30} />
      <CreateTokenFormLabel>Tax Receive Address</CreateTokenFormLabel>
      <ClearFix height={10} />
      <CreateTokenFormControl>
        <CreateTokenTextForm
          InputProps={{
            disableUnderline: true,
          }}
        />
      </CreateTokenFormControl>
      <ClearFix height={50} />
      <Grid container spacing={2}>
        <CreateTokenFormLabel>Tax Receive Address</CreateTokenFormLabel>
        <FormControlLabel onChange={buyBackHandle} control={<Switch color="success" size="small" />} sx={{ color: "#75E4AA", marginLeft: 0 }} />
      </Grid>
      <Box hidden={!buyBackStatus}>
        <ClearFix height={50} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <CreateTokenFormLabel>Transaction Tax (%)</CreateTokenFormLabel>
            <ClearFix height={10} />
            <CreateTokenFormControl>
              <CreateTokenTextForm
                InputProps={{
                  type: "number",
                }}
              />
            </CreateTokenFormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CreateTokenFormLabel>Burn Fee (%)</CreateTokenFormLabel>
            <ClearFix height={10} />
            <CreateTokenFormControl>
              <CreateTokenTextForm
                InputProps={{
                  type: "number",
                }}
              />
            </CreateTokenFormControl>
          </Grid>
        </Grid>
        <ClearFix height={30} />
        <CreateTokenFormLabel>Tax Receive Address</CreateTokenFormLabel>
        <ClearFix height={10} />
        <CreateTokenFormControl>
          <CreateTokenTextForm
            InputProps={{
              disableUnderline: true,
            }}
          />
        </CreateTokenFormControl>
        <Typography variant='body2' sx={{ fontStyle: "italic", color: "#7689B0" }}>This type of tax is buyback and burn. Burning after buyback, Repo funds automatically enter the liquidity pool</Typography>
      </Box>
      <ClearFix height={50} />
      <Grid container spacing={2}>
        <CreateTokenFormLabel>Holder Reward Fee</CreateTokenFormLabel>
        <FormControlLabel onChange={holderHandle} control={<Switch color="success" size="small" />} sx={{ color: "#75E4AA", marginLeft: 0 }} />
      </Grid>
      <Box hidden={!holderRewardStatus}>
        <ClearFix height={50} />
        <CreateTokenFormLabel>Holders Reward Fee</CreateTokenFormLabel>
        <ClearFix height={10} />
        <CreateTokenFormControl>
          <CreateTokenTextForm
            InputProps={{
              type: "number",
              disableUnderline: true,
            }}
          />
        </CreateTokenFormControl>
      </Box>
      <ClearFix height={50} />
      <Grid container spacing={2}>
        <CreateTokenFormLabel>Automatic LP</CreateTokenFormLabel>
        <FormControlLabel onChange={automaticLpHandle} control={<Switch color="success" size="small" />} sx={{ color: "#75E4AA", marginLeft: 0 }} />
      </Grid>
      <Box hidden={!lpStatus}>
        <ClearFix height={50} />
        <CreateTokenFormLabel>Automatic Tax</CreateTokenFormLabel>
        <ClearFix height={10} />
        <CreateTokenFormControl>
          <CreateTokenTextForm
            InputProps={{
              type: "number",
              disableUnderline: true,
            }}
          />
        </CreateTokenFormControl>
      </Box>
      <ClearFix height={50} />
      <Box>
        <Grid container spacing={2}>
          <CreateTokenFormLabel sx={{ marginRight: "20px !important" }}>Automatic LP</CreateTokenFormLabel>
          <Typography sx={{ color: "#EAFBF3" }}>PancakeSwapV2</Typography>
        </Grid>
        <ClearFix height={50} />
        <Grid container spacing={2}>
          <Typography variant="body2" sx={{ fontStyle: "italic", color: "#7689B0" }}>Set it up as 4% transaction tax and 1% burn, send 100 tokens then the user gets 95 tokens, 4 tokens sent to the receive address, 1 token burn</Typography>
        </Grid>
        <ClearFix height={50} />
        <Grid wrap="nowrap" container spacing={2}>
          <CreateTokenFormLabel sx={{ marginRight: "20px !important" }}>Free Breakdown</CreateTokenFormLabel>
          <Box>
            <Typography sx={{ color: "#BAC4D7" }}>Rewards to Holders: 5% | Marketing Tax : 1% | BuyBack Tax* : 4%</Typography>
            <Typography variant='body2' sx={{ color: "#BAC4D7" }}>*Will be utilised to keep the price of the token in check by buying back the tokens and burning them (like $RISE token)</Typography>
          </Box>
        </Grid>
      </Box>
      <ClearFix height={50} />
      <Grid container spacing={2}>
        <Typography variant="body2" color="#FFFFFF" sx={{ padding: "10px 20px", backgroundColor: "#107787", borderRadius: "15px" }}>
          It only takes 10 seconds to create successfully, without manual intervention, the token will be automatically transferred to the address of the creator/owner after the creation is successful. The token does not have any copyright, it is automatically deployed to the main network and verified!
        </Typography>
      </Grid>
    </Box>
  )
}

DeflationSetting.propTypes = {
  settingStep: PropTypes.bool.isRequired,
}

export default DeflationSetting

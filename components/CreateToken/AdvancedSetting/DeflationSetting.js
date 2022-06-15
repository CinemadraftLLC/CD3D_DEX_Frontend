import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CreateTokenFormControl, CreateTokenFormLabel } from "../create_token_widget";
import { Box, FormControlLabel, FormGroup, Grid, Stack, Switch, Typography } from "@mui/material";
import ClearFix from "../../ClearFix/ClearFix";
import CreateTokenTextForm from "../../CreateTokenSales/CreateTokenTextForm";

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
    </Box>
  )
}

DeflationSetting.propTypes = {
  settingStep: PropTypes.bool.isRequired,
}

export default DeflationSetting

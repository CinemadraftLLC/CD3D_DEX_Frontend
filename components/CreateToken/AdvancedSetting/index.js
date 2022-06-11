import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CreateTokenBigLabel, CreateTokenFormControl, CreateTokenSpanTitle, CreateTokenFormLabel, CreateTokenSelect, CreateTokenSmallLabel, CreateTokenSpan } from "../create_token_widget";
import { Box, FormControlLabel, Grid, Stack } from "@mui/material";
import ClearFix from "../../ClearFix/ClearFix";
import CreateTokenTextForm from "../../CreateTokenSales/CreateTokenTextForm";
import TaxPercent from '../TaxPercentage/TaxPercentage';
import AdvancedTokenomics from './AdvancedTokenomics';
import DeflationSetting from './DeflationSetting';

function AdvancedSetting({ advancedSetting, settingStep }) {

  return (
    <Box hidden={!advancedSetting}>
      <AdvancedTokenomics settingStep={settingStep} />
      <DeflationSetting settingStep={settingStep} />
    </Box>
  )
}

AdvancedSetting.propTypes = {
  advancedSetting: PropTypes.bool.isRequired,
  settingStep: PropTypes.bool.isRequired,
}

export default AdvancedSetting

import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography } from "@mui/material";
import AdvancedTokenomics from './AdvancedTokenomics';
import DeflationSetting from './DeflationSetting';
import { CreateTokenFormLabel } from '../create_token_widget';
import ClearFix from '../../ClearFix/ClearFix';

function AdvancedSetting({ advancedSetting, settingStep }) {

  return (
    <Box hidden={!advancedSetting}>
      <AdvancedTokenomics settingStep={settingStep} />
      <DeflationSetting settingStep={settingStep} />
      <ClearFix height={50} />
      <Box>
        <Grid container>
          <CreateTokenFormLabel sx={{ marginRight: "20px !important" }}>LP SWAP</CreateTokenFormLabel>
          <Typography sx={{ color: "#EAFBF3" }}>PancakeSwapV2</Typography>
        </Grid>
        <ClearFix height={50} />
        <Grid container>
          <Typography variant="body2" sx={{ fontStyle: "italic", color: "#7689B0" }}>Set it up as 4% transaction tax and 1% burn, send 100 tokens then the user gets 95 tokens, 4 tokens sent to the receive address, 1 token burn</Typography>
        </Grid>
        <ClearFix height={50} />
        <Grid wrap="nowrap" container >
          <CreateTokenFormLabel sx={{ marginRight: "20px !important" }}>Free Breakdown</CreateTokenFormLabel>
          <Box>
            <Typography sx={{ color: "#BAC4D7" }}>Rewards to Holders: 5% | Marketing Tax : 1% | BuyBack Tax* : 4%</Typography>
            <Typography variant='body2' sx={{ color: "#BAC4D7" }}>*Will be utilised to keep the price of the token in check by buying back the tokens and burning them (like $RISE token)</Typography>
          </Box>
        </Grid>
      </Box>
      <ClearFix height={50} />
      <Grid container >
        <Typography variant="body2" color="#FFFFFF" sx={{ padding: "10px 20px", backgroundColor: "#107787", borderRadius: "15px" }}>
          It only takes 10 seconds to create successfully, without manual intervention, the token will be automatically transferred to the address of the creator/owner after the creation is successful. The token does not have any copyright, it is automatically deployed to the main network and verified!
        </Typography>
      </Grid>
    </Box>
  )
}

AdvancedSetting.propTypes = {
  advancedSetting: PropTypes.bool.isRequired,
  settingStep: PropTypes.bool.isRequired,
}

export default AdvancedSetting

import React from "react";
import { CreateTokenFormControl, CreateTokenFormLabel, CreateTokenHelperText, CreateTokenButton, CreateTokensContentContainer, CreateTokenSecondLabel } from "./create_token_widget";
import { FormControlLabel, FormGroup, Grid, MenuItem, Select, Stack, Switch } from "@mui/material";
import ClearFix from "../ClearFix/ClearFix";
import CreateTokenTextForm from "../CreateTokenSales/CreateTokenTextForm";
import AdvancedSetting from "./AdvancedSetting";

const CreateTokenFormList = ({ submitTokenCreate }) => {
  const [tokenType, setTokenType] = React.useState('');
  const [advancedSetting, setAdvancedSetting] = React.useState(false);

  const handleTokenTypeChange = (event) => {
    setTokenType(event.target.value);
  }

  const handleAdvancedInfo = () => {
    setAdvancedSetting(prev => !prev)
  }

  return (
    <CreateTokensContentContainer>
      <Stack direction={"row"} justifyContent={"end"} alignItems={"center"}>
        <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
        <CreateTokenFormLabel>Fields are required</CreateTokenFormLabel>
      </Stack>
      <ClearFix height={10} />
      <Stack direction={"row"} justifyContent={"start"} alignItems={"center"}>
        <CreateTokenFormLabel>Token Type</CreateTokenFormLabel>
        <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
      </Stack>
      <ClearFix height={10} />
      <CreateTokenFormControl>
        <Select
          value={tokenType}
          onChange={handleTokenTypeChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">Standard Token</MenuItem>
          <MenuItem value={'main_net'}>ERC20</MenuItem>
          <MenuItem value={'dev_net'}>BEP20</MenuItem>
        </Select>
      </CreateTokenFormControl>
      <ClearFix height={10} />
      <CreateTokenHelperText error={true}>Fee : 0.2 BUSD</CreateTokenHelperText>
      <ClearFix height={35} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Stack direction={"row"} justifyContent={"start"}>
            <CreateTokenFormLabel>Name</CreateTokenFormLabel>
            <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
          </Stack>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Stack direction={"row"} justifyContent={"start"}>
            <CreateTokenFormLabel>Symbol</CreateTokenFormLabel>
            <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
          </Stack>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Grid>
      </Grid>
      <ClearFix height={50} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Stack direction={"row"} justifyContent={"start"}>
            <CreateTokenFormLabel>Decimals</CreateTokenFormLabel>
            <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
          </Stack>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                type: "number",
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Stack direction={"row"} justifyContent={"start"}>
            <CreateTokenFormLabel>Total Supply</CreateTokenFormLabel>
            <CreateTokenSecondLabel>*</CreateTokenSecondLabel>
          </Stack>
          <ClearFix height={10} />
          <CreateTokenFormControl>
            <CreateTokenTextForm
              InputProps={{
                type: "number",
                disableUnderline: true,
              }}
            />
          </CreateTokenFormControl>
        </Grid>
      </Grid>
      <ClearFix height={20} />
      <CreateTokenFormLabel>Admin/Owner</CreateTokenFormLabel>
      <ClearFix height={10} />
      <CreateTokenFormControl>
        <CreateTokenTextForm
          InputProps={{
            placeholder: "0x0000000000000000000000000000",
            disableUnderline: true,
          }}
        />
      </CreateTokenFormControl>
      <ClearFix height={60} />
      <FormGroup>
        <FormControlLabel onChange={handleAdvancedInfo} control={<Switch color="success" size="small" />} label="Advanced Settings" sx={{ color: "#75E4AA" }} />
      </FormGroup>
      <AdvancedSetting advancedSetting={advancedSetting} />
      <ClearFix height={50} />
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <CreateTokenButton size={"large"} onClick={() => submitTokenCreate()}>Create Token</CreateTokenButton>
      </Stack>
    </CreateTokensContentContainer>
  );
}
export default CreateTokenFormList;
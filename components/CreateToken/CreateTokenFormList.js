import React from "react";
import { CreateTokenFormControl, CreateTokenFormLabel, CreateTokenHelperText, CreateTokenButton, CreateTokensContentContainer, CreateTokenSecondLabel, CreateTokenSelect } from "./create_token_widget";
import { FormControlLabel, FormGroup, Grid, MenuItem, Select, Stack, Switch, Box } from "@mui/material";
import ClearFix from "../ClearFix/ClearFix";
import CreateTokenTextForm from "../CreateTokenSales/CreateTokenTextForm";
import AdvancedSetting from "./AdvancedSetting";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";

const CreateTokenFormList = ({ inputChange, getTokenType, submitTokenCreate }) => {
  const [tokenType, setTokenType] = React.useState('standard');
  const [advancedSetting, setAdvancedSetting] = React.useState(false);
  const [settingStep, setSettingStep] = React.useState(true)
  const [burnable, setBurnable] = React.useState(false)
  const { account } = useActiveWeb3React()

  const handleTokenTypeChange = (event) => {
    setTokenType(event.target.value);
    getTokenType(event.target.value);
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
          onChange={(e) => handleTokenTypeChange(e)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="standard">Standard Token</MenuItem>
          <MenuItem value={'antiBotStandard'}>Anti-Bot Standard Token</MenuItem>
          <MenuItem value={'liquidityGenerator'}>Liquidity Generator Token</MenuItem>
          <MenuItem value={'baby'}>Baby Token</MenuItem>
          <MenuItem value={'buybackBaby'}>Buyback Baby Token</MenuItem>
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
              onChange={(e) => inputChange(e, 0)}
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
              onChange={(e) => inputChange(e, 1)}
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
              onChange={(e) => inputChange(e, 2)}
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
              onChange={(e) => inputChange(e, 3)}
            />
          </CreateTokenFormControl>
        </Grid>
      </Grid>
      <ClearFix height={20} />
      <CreateTokenFormLabel>Admin/Owner</CreateTokenFormLabel>
      <ClearFix height={60} />
      <FormGroup>
        <FormControlLabel onChange={handleAdvancedInfo} control={<Switch color="success" size="small" />} label="Advanced Settings" sx={{ color: "#75E4AA" }} />
      </FormGroup>
      <ClearFix height={50} />
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <CreateTokenFormLabel>Features</CreateTokenFormLabel>
        <FormControlLabel checked={burnable ? "checked" : ""} onChange={() => setBurnable(prev => !prev)} control={<CreateTokenSelect />} label="Burn" sx={{ color: "#EAFBF3" }} />
        <FormControlLabel control={<CreateTokenSelect />} label="Mintable" sx={{ color: "#EAFBF3" }} />
        <FormControlLabel checked={!settingStep ? "checked" : ""} onChange={() => setSettingStep(prev => !prev)} control={<CreateTokenSelect />} label="Deflation" sx={{ color: "#EAFBF3" }} />
        <FormControlLabel checked={settingStep ? "checked" : ""} onChange={() => setSettingStep(prev => !prev)} control={<CreateTokenSelect />} label="Advanced Tokenomics" sx={{ color: "#EAFBF3" }} />
      </Stack>
      <ClearFix height={50} />
      <Box hidden={!burnable}>
        <CreateTokenFormLabel>Burn Fee</CreateTokenFormLabel>
        <ClearFix height={20} />
        <CreateTokenFormControl>
          <CreateTokenTextForm
            InputProps={{
              disableUnderline: true,
            }}
          />
        </CreateTokenFormControl>
        <ClearFix height={60} />
      </Box>

      <AdvancedSetting advancedSetting={advancedSetting} settingStep={settingStep} />
      <ClearFix height={30} />

      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <CreateTokenButton size={"large"} onClick={() => submitTokenCreate()}>Create Token</CreateTokenButton>
      </Stack>
    </CreateTokensContentContainer>
  );
}
export default CreateTokenFormList;
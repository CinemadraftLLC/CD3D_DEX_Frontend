import React from "react";
import Image from "next/image";
import TokenCreator from '../../public/assets/svgs/g10.svg';
import ClearFix from "../ClearFix/ClearFix";
import { Box, Grid, Stack, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { CreateTokensContainer, CreateTokenImage } from "./create_token_widget";
import CreateTokenFormList from "./CreateTokenFormList";

const CreateTokenPage = () => {
  const [step, setStep] = React.useState(0);

  const handleChange = (newValue) => {
    setStep(newValue);
  };
  return (
    <Box role="tabpanel" id={"tab_panel_create_sale"} aria-labelledby={"Create Sale"} sx={{ width: '100%' }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={3}>
          <CreateTokensContainer>
            <CreateTokenImage>
              <Image src={TokenCreator} alt="Token Creator Image" />
            </CreateTokenImage>
          </CreateTokensContainer>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Box sx={{ width: '100%' }}>
            <CreateTokenFormList submitTokenCreate={() => {
              handleChange(1);
            }} />
          </Box>
          <ClearFix height={150} />
        </Grid>
      </Grid>
    </Box>
  );
}
export default CreateTokenPage;
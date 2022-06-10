import React from "react";
import { useRouter } from 'next/router';
import ClearFix from "../../components/ClearFix/ClearFix";
import { Box, Container } from "@mui/material";
import CreateTokenPage from "../../components/CreateToken";

const CreateToken = () => {

  return (
    <Container maxWidth={'xl'}>
      <ClearFix height={30} />
      <Box sx={{ width: '100%' }}>
        <ClearFix height={30} />
        <CreateTokenPage />
      </Box>
    </Container>
  );
}
export default CreateToken;
import React from "react";
import Image from "next/image";
import TokenCreator from '../../public/assets/svgs/g10.svg';
import ClearFix from "../ClearFix/ClearFix";
import { Box, Grid } from "@mui/material";
import converter from "ethereum-unit-converter";
// import toast from "react-hot-toast";
import { toast } from 'react-toastify'
import { CreateTokensContainer, CreateTokenImage } from "./create_token_widget";
import CreateTokenFormList from "./CreateTokenFormList";
import { deployContract } from "../../utils/createTokenHelper";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { showToast } from "../../utils/toast";


const CreateTokenPage = () => {
  const { account } = useActiveWeb3React()
  const [args, setArgs] = React.useState([]);
  const [network, setNetwork] = React.useState("bsc")

  const inputChange = (e, i) => {
    const { value } = e.target;
    let val;
    if (i === 3) {
      val = converter(value, "ether", "wei");
    } else if (value === "") {
      val = null
    } else {
      val = value;
    }
    setArgs(prev => {
      let temp = prev.map(item => item)
      temp[i] = val
      return temp
    })
  }

  const createToken = async () => {
    try {
      if (args.length !== 4) {
        toast.warning("Must fill all parameters", { toastId: 1 });
        return
      }
      await deployContract(network, args, account);
      toast.success("Token created successfully.", { toastId: 1 })
    } catch (error) {
      showToast("error", "Transaction Failed", error.message)
    }
  };

  const getNetwork = (network) => {
    setNetwork(network);
  }
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
            <CreateTokenFormList inputChange={inputChange} getNetwork={getNetwork} submitTokenCreate={createToken} />
          </Box>
          <ClearFix height={150} />
        </Grid>
      </Grid>
    </Box>
  );
}
export default CreateTokenPage;
import React from "react";
import {useRouter} from 'next/router';
import ClearFix from "../../components/ClearFix/ClearFix";
import {Box, Container, Tabs} from "@mui/material";
import CreatePresalePage from "../../components/CreateTokenSales/CreatePresalePage";
import CreateSalePage from "../../components/CreateTokenSales/CreateSalePage";
import {CreateTokenSalesTab} from "../../components/CreateTokenSales/create_token_sales_widget";

const CreateTokenSales = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth={'xl'}>
            <ClearFix height={30}/>
            <Box sx={{width: '100%'}}>
                <Tabs value={value} onChange={handleChange} centered TabIndicatorProps={{style: {display: "none"}}}>
                    <CreateTokenSalesTab id={"tab_create_presale"} className={"first"} label="Create Presale" aria-controls={"tab_panel_create_presale"}/>
                    <CreateTokenSalesTab id={"tab_create_sale"} className={"second"} label="Create Sale" aria-controls={"tab_panel_create_sale"}/>
                </Tabs>
                <ClearFix height={30}/>
                <CreatePresalePage index={0} value={value}/>
                <CreateSalePage index={1} value={value}/>
            </Box>
        </Container>
    );
}
export default CreateTokenSales;
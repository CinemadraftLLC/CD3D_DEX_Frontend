import React from "react";
import { useRouter } from 'next/router';
import ClearFix from "../../components/ClearFix/ClearFix";
import { Box, Container, Tabs } from "@mui/material";
import CreatePresalePage from "../../components/CreateTokenSales/CreatePresalePage";
import CreateSalePage from "../../components/CreateTokenSales/CreateSalePage";
import { CreateTokenSalesTab } from "../../components/CreateTokenSales/create_token_sales_widget";

const CreateTokenSales = () => {
    const [value, setValue] = React.useState(1);

    const router = useRouter()

    const handleChange = (event, newValue) => {
        if (newValue === 0) router.push("/create_token")
        setValue(newValue);
    };

    return (
        <Container maxWidth={'xl'}>
            <ClearFix height={30} />
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} centered TabIndicatorProps={{ style: { display: "none" } }}>
                    <CreateTokenSalesTab id={"tab_create_token"} className={"first"} label="Create Token" aria-controls={"tab_panel_create_token"} />
                    <CreateTokenSalesTab id={"tab_create_presale"} className={"middle"} label="Create Presale" aria-controls={"tab_panel_create_presale"} />
                    <CreateTokenSalesTab id={"tab_create_sale"} className={"second"} label="Create Sale" aria-controls={"tab_panel_create_sale"} />
                </Tabs>
                <ClearFix height={30} />
                <CreatePresalePage index={1} value={value} />
                <CreateSalePage index={2} value={value} />
            </Box>
        </Container>
    );
}
export default CreateTokenSales;
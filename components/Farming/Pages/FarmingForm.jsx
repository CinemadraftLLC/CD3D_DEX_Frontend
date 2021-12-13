import React from "react";
import styles from "../../../styles/farming.module.css";
import {Box, Grid} from "@mui/material";
import FarmingItem from "./FarmingItem";

const FarmingForm = (props) => {
    const {onStack} = props;

    return (
        <Box className={styles.farmingFormContainer}>
            <Grid container className={styles.form_wrapper}>
                <Grid item xs={12} sm={12} md={6} xl={4} >
                    <FarmingItem farm={{}} onStack={onStack}/>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={4}>
                    <FarmingItem farm={{}} onStack={onStack}/>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={4}>
                    <FarmingItem farm={{}} onStack={onStack}/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default FarmingForm;

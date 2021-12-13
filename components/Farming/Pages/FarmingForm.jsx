import React from "react";
import styles from "../../../styles/farming.module.css";
import {Box, Container, Grid} from "@mui/material";
import FarmingItem from "./FarmingItem";

const FarmingForm = (props) => {
    const {onStack} = props;

    return (
        // <div className={styles.farmingFormContainer}>
        //     <div className={styles.form_wrapper}>
        //         <FarmingItem farm={{}} onStack={onStack}/>
        //         <FarmingItem farm={{}} onStack={onStack}/>
        //         <FarmingItem farm={{}} onStack={onStack}/>
        //     </div>
        // </div>
        <Container maxWidth={"xl"}>
            <Box className={styles.farmingFormContainer}>
                <Grid container spacing={{xs: 2, md: 3}} className={styles.form_wrapper}>
                    <Grid item xs={12} sm={6} md={4} xl={6}>
                        <FarmingItem farm={{}} onStack={onStack}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={6}>
                        <FarmingItem farm={{}} onStack={onStack}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} xl={6}>
                        <FarmingItem farm={{}} onStack={onStack}/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default FarmingForm;

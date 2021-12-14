import React, {useState} from "react";
import styles from "../../styles/farming.module.css";
import Image from "next/image";
import FarmingBanner from "../../components/Farming/Pages/FarmingBanner";
import FarmingForm from "../../components/Farming/Pages/FarmingForm";
import ClearFix from "../../components/ClearFix/ClearFix";
import {Container} from "@mui/material";

const Farming = () => {

    return (
        <Container maxWidth={"xl"}>
            <div className={styles.container}>
                <div className={styles.bannerImg}>
                    <Image src={'/assets/images/tech.png'} alt={''} height={'450px'} width={'550px'} objectFit={"contain"}/>
                </div>
                <FarmingBanner total={1373674833.06}/>
                <FarmingForm />
                <ClearFix height={100}/>
            </div>
        </Container>
    );
}

export default Farming;

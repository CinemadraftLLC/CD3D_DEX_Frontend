import styles from "../../../styles/farming.module.css";
import Image from "next/image";
import {Typography} from "@material-ui/core";
import React, {useState} from "react";
import {Button} from "@mui/material";

const FarmingItem = ({farm, onStack}) => {
    const [view, setView] = useState("mounted"); //init, loading, mounted

    let widget;

    const onClaim = () => {}

    switch (view) {
        case "init":
            widget = (
                <div className={styles.form_row}>
                    <Button variant="contained" onClick={() => setView('loading')} fullWidth={true} size={'large'}>
                        Enable Contract
                    </Button>
                </div>
            );
            break;
        case "loading" :
            widget = (
                <div className={styles.form_row}>
                    <Button variant="contained" fullWidth={true} size={'large'} disabled={true}>
                        Enabling Contract
                    </Button>
                </div>
            );
            break;
        case "mounted":
            widget = (
                <div className={styles.form_row}>
                    <Button variant="contained" onClick={() => onClaim()} fullWidth={true} size={'large'} className={styles.outlined}>
                        Claim CD3D
                    </Button>
                    <div style={{width: "20px"}}/>
                    <Button variant="contained" onClick={() => onStack()} fullWidth={true} size={'large'}>
                        Stake LP
                    </Button>
                </div>
            );
            break;
    }

    return (
        <div className={styles.farmingContent}>
            <div className={styles.form_image}>
                <Image src={'/assets/images/busd-cd3d.png'} alt={''} height={'70px'} width={'60px'} objectFit={"contain"}/>
            </div>
            <div className={styles.form_header}>
                <h1 className={styles.form_title1}>CD3D-BUSD LP</h1>
                <h1 className={styles.form_title2}>46.11%</h1>
                <span className={styles.form_subtitle}>APR</span>
            </div>
            <div className={styles.form_divider}/>
            <div className={styles.form_body}>
                <div className={styles.form_row}>
                    <Typography className={styles.row_label} variant="subtitle2">Earn</Typography>
                    <div className={styles.form_row} style={{marginBottom: 0}}>
                        <Image src={"/assets/images/cd3d.png"} height={19} width={16} objectFit={"contain"}/>
                        <Typography className={styles.row_label} variant="subtitle2">
                            &nbsp;&nbsp;CD3d + Fees
                        </Typography>
                    </div>
                </div>
                <div className={styles.form_row}>
                    <Typography className={styles.row_label} variant="subtitle2">Total Liquidity</Typography>
                    <Typography className={styles.row_label} variant="subtitle2">Earn</Typography>
                </div>
                <div className={styles.form_row}>
                    <Typography className={styles.row_label} variant="subtitle2">My Share</Typography>
                    <Typography className={styles.row_label} variant="subtitle2">Earn</Typography>
                </div>
                <div className={styles.form_row}>
                    <Typography className={styles.row_label} variant="subtitle2">CD3D Earned</Typography>
                    <Typography className={styles.row_label} variant="subtitle2">Earn</Typography>
                </div>
                <div className={styles.form_row}>
                    <Typography className={styles.row_label} variant="subtitle2">CD3D - BUSD Staked</Typography>
                    <Typography className={styles.row_label} variant="subtitle2">Earn</Typography>
                </div>
                {widget}
                <div className={styles.form_row}>
                    <Typography className={styles.row_label} variant="subtitle2">
                        <a href={'#'} target='_blank'>
                            Get CD3D - BUSD LP
                        </a>
                    </Typography>
                    <Typography className={styles.row_label} variant="subtitle2">
                        <a href={'#'} target='_blank'>
                            View Contract
                        </a>
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default FarmingItem;

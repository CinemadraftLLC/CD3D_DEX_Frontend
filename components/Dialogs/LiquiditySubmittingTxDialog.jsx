import React from "react";
import Modal from 'react-modal';
import styles from "../../styles/Dialog.module.css";
import { Typography } from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Transaction_check from "../../public/assets/Transaction_check.svg";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import Image from "next/image";

const LiquiditySubmittingTxDialog = (props) => {
    const {show, onClose, onSubmit, type, onBinance} = props;

    return (
        <Modal
            isOpen={show}
            onRequestClose={() => onClose()}
            centered
            style={{
                overlay: {
                  backgroundColor: "#00000050",
                },
                content: {
                    width: '430px',
                    height: '414px',
                    margin: 'auto',
                    borderRadius: '15px',
                    padding: '20px',
                    backgroundColor: "#EAFBF3",
                }
            }}
        >
            <div className={`${styles.DialogContainer}`}>
                <Typography className={`${styles.DialogTitle}`} variant="subtitle2">You will receive</Typography>
                <FontAwesomeIcon icon={faTimes} className={`${styles.DialogClose}`} onClick={() => onClose()}/>
                <Image src={Transaction_check} alt={''} height={60} width={60} />
                <div>
                    <Typography className={`${styles.DialogSubTitle}`} variant="subtitle2">{type === "submit" ? "Submitting Transaction" : "Transaction Submitted"}</Typography>
                    <Typography className={`${styles.DialogBinance}`} variant="subtitle2" onClick={() => onBinance()}>View on Binance</Typography>
                </div>
                <Button variant="contained" className={`${styles.DialogSubmit}`} onClick={() => onSubmit()}>
                    Close
                </Button>
            </div>
        </Modal>
    );
}
export default LiquiditySubmittingTxDialog;
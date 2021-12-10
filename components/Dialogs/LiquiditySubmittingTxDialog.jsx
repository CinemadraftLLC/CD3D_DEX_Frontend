import React from "react";
import Modal from 'react-modal';
import styles from "../../styles/Dialog.module.css";
import {Link, Typography} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Transaction_check from "../../public/assets/Transaction_check.svg";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import Image from "next/image";
import {getBscScanLink} from "../../utils";
import {NETWORK_CHAIN_ID} from "../../connectors";

const LiquiditySubmittingTxDialog = (props) => {
    const {show, onClose, txHash, swapErrorMessage, onBinance} = props;

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
            {
                swapErrorMessage?
                    <div className={`${styles.DialogContainer}`}>
                        <Typography className={`${styles.DialogTitle}`} variant="subtitle2">Transaction Failed</Typography>
                        {/* TODO  Change Icon*/}
                        <FontAwesomeIcon icon={faTimes} className={`${styles.DialogClose}`} onClick={() => onClose()}/>
                        <Image src={Transaction_check} alt={''} height={60} width={60} />
                        <div>
                            <Typography className={`${styles.DialogSubTitle}`} variant="subtitle2">swapErrorMessage</Typography>
                        </div>
                        <Button variant="contained" className={`${styles.DialogSubmit}`} onClick={() => onClose()}>
                            Close
                        </Button>
                    </div>
                    :
                    <div className={`${styles.DialogContainer}`}>
                        <Typography className={`${styles.DialogTitle}`} variant="subtitle2">You will receive</Typography>
                        <FontAwesomeIcon icon={faTimes} className={`${styles.DialogClose}`} onClick={() => onClose()}/>
                        <Image src={Transaction_check} alt={''} height={60} width={60} />
                        <div>
                            <Typography className={`${styles.DialogSubTitle}`} variant="subtitle2">{!txHash ? "Submitting Transaction" : "Transaction Submitted"}</Typography>
                            {
                                txHash &&
                                <Link target={"_blank"} href={getBscScanLink(NETWORK_CHAIN_ID, txHash, 'transaction')}>
                                    <Typography className={`${styles.DialogBinance}`} variant="subtitle2">
                                        View on Binance
                                    </Typography>
                                </Link>
                            }
                        </div>
                        <Button variant="contained" className={`${styles.DialogSubmit}`} onClick={() => onClose()}>
                            Close
                        </Button>
                    </div>
            }
        </Modal>
    );
}
export default LiquiditySubmittingTxDialog;

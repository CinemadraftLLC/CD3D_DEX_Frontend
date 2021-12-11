import React, {useState} from "react";
import Modal from 'react-modal';
import styles from "../../styles/Dialog.module.css";
import {Typography} from "@material-ui/core";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Button from "@mui/material/Button";
import {Chip, FormControl, InputAdornment, InputBase, InputLabel, TextField} from "@mui/material";
import {alpha, styled} from '@mui/material/styles';

const FarmingDialog = (props) => {
    const {show, onClose, onSubmit, loading} = props;
    const [input, setInput] = useState("");


    const StackTextField = styled((props) => (
        <TextField
            InputProps={{
                disableUnderline: true,
                endAdornment: <InputAdornment position="end">
                    <Chip label="Max" color={"error"} size={"small"}/>
                    <Typography variant="subtitle2">CD3D - BUSD LP</Typography>
                </InputAdornment>,
            }}
            {...props}
        />
    ))(({theme}) => ({
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiFilledInput-root': {
            border: '1px solid #1D9756',
            overflow: 'hidden',
            borderRadius: 12,
            backgroundColor: '#FFF1F5',
            transition: theme.transitions.create([
                'border-color',
                'background-color',
                'box-shadow',
            ]),
        },
        '.MuiFilledInput-input': {
            padding: 12,
        },

        '.MuiFormHelperText-root': {
            color: '#166C3D',
            fontSize: 14,
            marginLeft: 4,
        },

        '.MuiTypography-root' : {
            color: '#166C3D',
            fontSize: 14,
            fontWeight: "bold",
            marginLeft: 10,
        }
    }));

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
                    width: '582px',
                    height: '502px',
                    margin: 'auto',
                    borderRadius: '15px',
                    padding: '20px',
                    backgroundColor: "#EAFBF3",
                }
            }}
        >
            <div className={styles.DialogContainer}>
                <Typography className={styles.DialogTitle} variant="subtitle2">CD3D - BUSD Farming</Typography>
                <FontAwesomeIcon icon={faTimes} className={styles.DialogClose} onClick={() => onClose()}/>
                <div className={styles.DialogInfoContainer}>
                    <Image src={'/assets/busd-cd3d.png'} alt={''} height={40} width={50}/>
                    <div className={`${styles.Info}`}>
                        <Typography className={styles.title_primary} variant="subtitle2">46.11%</Typography>
                        <Typography className={styles.description_primary} variant="subtitle2">APR</Typography>
                    </div>
                </div>
                <div className={styles.DialogFarmingForm}>
                    <FormControl variant="standard">
                        <InputLabel shrink htmlFor="stack-input" className={styles.formLabel}>
                            Stack
                        </InputLabel>
                        <StackTextField
                            defaultValue=""
                            id="stack-input"
                            variant="filled"
                            size={"small"}
                            helperText={"Available : 0.003437302"}
                        />
                    </FormControl>
                </div>
                <div className={`${styles.DialogItem}`}>
                    <Typography className={`${styles.DialogSpan}`} variant="subtitle2">Annual ROI at current rates:</Typography>
                    <Typography className={`${styles.DialogSpan}`} variant="subtitle2">$18.22</Typography>
                </div>
                <div className={styles.Dialog_Footer}>
                    <Button variant="contained" className={`${styles.DialogSubmit}`} onClick={() => onSubmit()} fullWidth={true}>
                        {loading ? 'Stacking' : 'Stack'}
                    </Button>
                    <Typography className={styles.link} variant="subtitle2">
                        <a href={'#'} target='_blank'>
                            Get CD3D - BUSD LP
                        </a>
                    </Typography>
                </div>
            </div>
        </Modal>
    );
}
export default FarmingDialog;
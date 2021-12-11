import * as React from "react";
import {Button} from "@mui/material";
import styles from "../../styles/form.module.css";

const FormSubmitBtn = (props) => {
    const {label, loading, onSubmit} = props;
    return (
        <div className={styles.customFormButton}>
            <Button variant="contained" className={loading ? `${styles.loading}` : ''} onClick={() => onSubmit()} fullWidth={true}>
                {label}
            </Button>
        </div>
    );
}
export default FormSubmitBtn;


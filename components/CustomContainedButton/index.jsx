import React from 'react';
import { ButtonBase } from '@material-ui/core';
import styles from '../../styles/customButton.module.css';

function CustomContainedButton({ btnTitle, customStyles, disabled }) {
  return (
    <div className={styles.btn}>
      <ButtonBase variant='contained' className={`${disabled ? styles.deactive : styles.active}`} style={customStyles}>
        {btnTitle}
      </ButtonBase>
    </div>
  );
}

export default CustomContainedButton;

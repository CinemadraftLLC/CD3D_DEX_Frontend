import React from 'react';
import { ButtonBase } from '@material-ui/core';
function CustomContainedButton({ btnTitle, customStyles }) {
  return (
    <ButtonBase variant='contained' style={customStyles}>
      {btnTitle}
    </ButtonBase>
  );
}

export default CustomContainedButton;

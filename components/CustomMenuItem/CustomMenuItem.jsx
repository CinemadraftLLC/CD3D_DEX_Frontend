import React, { useState } from "react";
import { Typography, MenuItem } from "@material-ui/core";
import styles from "../../styles/customMenu.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

const style = {
  largeIcon: {
    height: 20,
    width: 30,
    color: "#75e4aa",
  },
};
function CustomMenuItem(props) {
  const { handleClose } = props;
  const [state, setState] = useState(false);

  const handleOnHoverActive = () => {
    setState(true);
  };
  const handleOnHoverDeactive = () => {
    setState(false);
  };
  return (
    <div className={`${styles.MenuItemContainer}`}>
      {props.to ? (
        <MenuItem className={`${styles.MenuItem}`} onClick={handleClose}>
          <Link href={`${props.to}`}>
            <div
              className={styles.titleContainer}
              onMouseOver={handleOnHoverActive}
              onMouseOut={handleOnHoverDeactive}
              onClick={handleClose}
            >
              <div className={styles.titleSubContainer}>
                <Typography variant="subtitle1">{props?.title}</Typography>
                <Typography variant="subtitle2">{props?.subTitle}</Typography>
              </div>
              {state && (
                <div>
                  <ArrowForwardIosIcon sx={style.largeIcon} />
                </div>
              )}
            </div>
          </Link>
        </MenuItem>
      ) : (
        <MenuItem className={`${styles.MenuItemDisabled} `}>
          <Link href={`${props.to}`}>
            <div className={styles.titleContainer}>
              <div className={styles.titleSubContainer}>
                <Typography variant="subtitle1">{props?.title}</Typography>
                <Typography variant="subtitle2">{props?.subTitle}</Typography>
              </div>
              {state && (
                <div>
                  <ArrowForwardIosIcon sx={style.largeIcon} />
                </div>
              )}
            </div>
          </Link>
        </MenuItem>
      )}
    </div>
  );
}

export default CustomMenuItem;

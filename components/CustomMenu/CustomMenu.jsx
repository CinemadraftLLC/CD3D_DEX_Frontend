import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import styles from "../../styles/customMenu.module.css";
/**
 * Custom Menu for whole application
 * @return {JSX.Element}
 */

const StyledMenu = withStyles({
  paper: {
    width: "20.2rem",
    // background: "rgba(8,17,35, 0.7)", // Make sure this color has an opacity of less than 1
    // borderRadius: "15px",
    // color: "white",
    borderRadius: "15px",
    background: "transparent",
    /* Note: currently only Safari supports backdrop-filter */
    backgroundColor: "rgba(0, 0, 0, 0.07)",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
));

function CustomMenu(props) {
  const { child1, child2 } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {child1}
      </div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {child2}
      </StyledMenu>
    </div>
  );
}

export default CustomMenu;

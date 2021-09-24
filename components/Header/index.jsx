import React from "react";
import Image from "next/image";
import Logo from "../../public/assets/logo.svg";
import CinemaLogo from "../../public/assets/homepage/CinemaLogo.png";

// import "./navbar.module.css"
import Container from "@mui/material/Container";
import styles from "../../styles/navbar.module.css";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import DrawerComponent from "./HeaderComponents/DrawerComponent";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { socialData } from "data/data";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <div>
      <AppBar position="static" className={styles.menuBG}>
        <Container>
          <CssBaseline />
          <Toolbar>
            <div className={styles.navbarInner}>
              <Link href="/">
                <Image src={Logo} alt="logo" width={300} height={130} />
              </Link>

              {/* {isMobile ? ( */}
              <DrawerComponent />
            </div>
            {/* ) : ( */}
            <div className={styles.navlinks}>
              <Button
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                MARKETPLACE <ArrowDropDownIcon />
              </Button>

              <Link href="/" className={styles.link}>
                REFERRAL
              </Link>

              <Button
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open2 ? "true" : undefined}
                onClick={handleClick2}
              >
                COMMUNITY <ArrowDropDownIcon />
              </Button>
              <Link href="/" className={styles.link}>
                MORE
              </Link>
            </div>
            {/* )} */}
            <div className={styles.rightMenu}>
              <Link href="/" className={styles.playLink}>
                Play
              </Link>
              <div className={styles.cinemaLog}>
                <Image
                  src={CinemaLogo}
                  alt="CinemaLogo"
                  width={130}
                  height={29}
                />
              </div>
            </div>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <Link href="/Token">Token Sales</Link>
              </MenuItem>
            </Menu>
            <Menu
              anchorEl={anchorEl2}
              open={open2}
              onClose={handleClose2}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {socialData.map((elem) => (
                <MenuItem key={elem.id}>
                  <Link href={elem.link}>{elem.title}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;

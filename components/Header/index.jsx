import React from "react";
import Image from "next/image";
import Logo from "../../public/assets/logo.svg";
import CinemaLogo from "../../public/assets/homepage/CinemaLogo.png";

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
import { marketPlaceData, moreData, socialData } from "data/data";
import CustomMenu from "../CustomMenu/CustomMenu";
import CustomMenuItem from "../CustomMenuItem/CustomMenuItem";

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
              <CustomMenu
                anchorEl={anchorEl}
                handleClose={handleClose}
                handleClick={handleClick}
                child1={
                  <Button
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    MARKETPLACE <ArrowDropDownIcon />
                  </Button>
                }
                child2={marketPlaceData.map((item, index) => (
                  <CustomMenuItem
                    title={item.title}
                    subTitle={item.subTitle}
                    disabled={true}
                    to={item.link}
                    handleClose={handleClose}
                  />
                ))}
              />

              <Link href="/" className={styles.link}>
                REFERRAL
              </Link>
              {/* <CustomMenu
                child1={ */}
              {/* <Button
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open2 ? "true" : undefined}
                onClick={handleClick2}
              >
                COMMUNITY
                <ArrowDropDownIcon />
              </Button> */}
              <Link href="/" className={styles.link}>
                COMMUNITY
              </Link>
              {/* }
                child2={socialData.map((elem) => (
                  <CustomMenuItem
                    key={elem.id}
                    title={elem.title}
                    subTitle={elem.subTitle}
                    disabled={true}
                    to={elem.link}
                  />
                ))}
              /> */}
              <CustomMenu
                anchorEl={anchorEl}
                handleClose={handleClose}
                handleClick={handleClick}
                child1={
                  <Button
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open2 ? "true" : undefined}
                    onClick={handleClick2}
                  >
                    MORE <ArrowDropDownIcon />
                  </Button>
                }
                child2={moreData.map((elem) => (
                  <CustomMenuItem
                    key={elem.id}
                    title={elem.title}
                    subTitle={elem.subTitle}
                    disabled={true}
                    to={elem.link}
                    handleClose={handleClose}
                  />
                ))}
              />
            </div>
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
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;

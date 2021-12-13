import React from "react";
import Image from "next/image";
import Logo from "../../public/assets/logo.svg";
import CinemaLogo from "../../public/assets/homepage/CinemaLogo.png";

import Container from "@mui/material/Container";
import styles from "../../styles/navbar.module.css";
import {AppBar, Toolbar, CssBaseline} from "@material-ui/core";
import DrawerComponent from "./HeaderComponents/DrawerComponent";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import Button from "@mui/material/Button";
import {marketPlaceData, moreData, socialData} from "data/data";
import CustomMenu from "../CustomMenu/CustomMenu";
import CustomMenuItem from "../CustomMenuItem/CustomMenuItem";
import WalletHeaderComponent from "./HeaderComponents/WalletHeaderComponent";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import {useCurrency} from "../../hooks/Tokens";
import {BUSD, CD3D} from "../../constants";
import {NETWORK_CHAIN_ID} from "../../connectors";
import {useCurrencyBalances} from "../../state/wallet/hooks";
import {Stack, Typography} from "@mui/material";

const Header = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const {account} = useActiveWeb3React()

    const currencyCD3D = useCurrency(CD3D[NETWORK_CHAIN_ID].address);
    const currencyBUSD = useCurrency(BUSD[NETWORK_CHAIN_ID].address);

    const currencyBalances = useCurrencyBalances(account ?? undefined, [currencyCD3D, currencyBUSD]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" className={styles.menuBG} color={"transparent"}>
            <CssBaseline/>
            <Toolbar style={{padding: 0}}>
                <div className={styles.navbarInner}>
                    <Link href="/">
                        <Image src={Logo} alt="logo" width={300} height={130}/>
                    </Link>

                    <DrawerComponent/>
                </div>

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
                                MARKETPLACE <ArrowDropDownIcon/>
                            </Button>
                        }
                        child2={marketPlaceData.map((item, index) => (
                            <CustomMenuItem
                                key={item.id}
                                title={item.title}
                                subTitle={item.subTitle}
                                disabled={true}
                                to={item.link}
                                external={item.external}
                            />
                        ))}
                    />

                    <Link href="/">
                        <Stack justifyContent={"center"} alignItems={"center"}>
                            <span style={{color: 'white'}}>REFERRAL</span>
                        </Stack>
                    </Link>
                    <CustomMenu
                        child1={
                            <Button
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                            >
                                COMMUNITY
                                <ArrowDropDownIcon/>
                            </Button>
                        }
                        child2={socialData.map((elem) => (
                            <CustomMenuItem
                                key={elem.id}
                                title={elem.title}
                                subTitle={elem.subTitle}
                                disabled={true}
                                to={elem.link}
                                external={elem.external}
                                handleClose={handleClose}
                            />
                        ))}
                    />
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
                                MORE <ArrowDropDownIcon/>
                            </Button>
                        }
                        child2={moreData.map((elem) => (
                            <CustomMenuItem
                                key={elem.id}
                                title={elem.title}
                                subTitle={elem.subTitle}
                                disabled={true}
                                to={elem.link}
                                external={elem.external}
                                handleClose={handleClose}
                            />
                        ))}
                    />
                </div>

                {
                    !account ? (<div className={styles.rightMenu}>
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
                    </div>) : (<div className={styles.rightMenu}>
                        <WalletHeaderComponent wallet={account} busd={currencyBalances[1]?.toSignificant(6) ?? '-'} cd3d={currencyBalances[0]?.toSignificant(12) ?? '-'}/>
                    </div>)
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../public/assets/logo.svg";
import CD3fiLogo from "../../public/assets/cd3fi.png"
import styles from "../../styles/navbar.module.css";
import { AppBar, Toolbar } from "@material-ui/core";
import DrawerComponent from "./HeaderComponents/DrawerComponent";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import { marketPlaceData, moreData, socialData } from "data/data";
import WalletHeaderComponent from "./HeaderComponents/WalletHeaderComponent";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { useCurrency } from "../../hooks/Tokens";
import { useCurrencyBalances } from "../../state/wallet/hooks";
import { Stack, Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import HeaderClient from "./HeaderComponents/HeaderClient";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import tokens, { serializeTokens } from "../../constants/tokens";
import { useRouter } from "next/router";

const HeaderMenuLink = styled(Button)({
  color: "#EAFBF3",
  fontSize: "13px",
  letterSpacing: "2.21px",
  marginRight: "20px",
  marginLeft: "20px",
  '&:hover': {
    backgroundColor: "transparent",
    color: "#A0EDC4",
  }
})

const HeaderMenu = styled(Menu)({
  '& .MuiMenu-paper': {
    maxHeight: "400px",
    overflowX: "hidden",
    overflowY: "scroll",
    width: "24.2rem",
    borderRadius: "15px",
    padding: "0 10px",
    background: "transparent",
    backgroundColor: "rgba(0, 0, 0, 0.07)",
    backdropFilter: "15px",
    boxShadow: "none",
    '&::-webkit-scrollbar': {
      width: "3px",
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: "#EAFBF3",
      borderRadius: "3px",
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: "#75E4AA",
      outline: "1px solid #75E4AA",
      borderRadius: "5px",
    },
    '& .MuiMenuItem-root': {
      padding: "10px 20px",
      color: '#EAFBF3',
      display: "block",
      '&:hover': {
        background: "rgba(255, 255, 255, 0.07)",
        backdropFilter: "21px",
        borderRadius: "15px",
        '& .MuiBox-root': {
          display: "block",
        },
        '& .MuiTypography-subtitle1': {
          color: '#75E4AA',
        }
      },
      '& .MuiBox-root': {
        display: "none",
      },
      '& .MuiTypography-subtitle1': {
        fontSize: "16px",
      },
      '& .MuiTypography-subtitle2': {
        fontSize: "14px",
        marginTop: "3px",
        letterSpacing: "1px",
      },
    }
  }
})

const Header = (props) => {
  const router = useRouter();
  const [marketMenu, setMarketMenu] = React.useState(null);
  const [moreMenu, setMoreMenu] = React.useState(null);
  const [communityMenu, setCommunityMenu] = React.useState(null);
  const { account } = useActiveWeb3React()
  const [expandedMenu, setExpandedMenu] = useState(router.pathname !== '/' ? false : true)

  const currencyCD3D = useCurrency(tokens.cd3d.address);
  const currencyBUSD = useCurrency(tokens.busd.address);

  const currencyBalances = useCurrencyBalances(account ?? undefined, [currencyCD3D, currencyBUSD]);

  return (
    <AppBar position="fixed" className={styles.menuBG}>
      <Toolbar>
        <Image src={Logo} alt="logo" width={130} height={35} objectFit={"contain"} onClick={() => {
          router.push("/");
        }} />
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ flexGrow: 1, marginLeft: "20px", display: { xs: 'none', sm: 'none', md: 'flex' } }}>
          <MenuIcon style={{transform:expandedMenu?"rotate(-90deg)": "none" ,cursor:"pointer"}} onClick={ () => {setExpandedMenu(!expandedMenu)}}/>
          </Stack>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ flexGrow: 1, marginLeft: "50px", display: { xs: 'none', sm: 'none', md: 'flex' } }}>
          {expandedMenu?<Box sx={{ flexGrow: 1 }}>
            <HeaderMenuLink
              aria-controls="basic-menu"
              aria-haspopup="true"
              onClick={(event) => {
                setMarketMenu(event.currentTarget);
              }}
            >
              MARKETPLACE <ArrowDropDownIcon />
            </HeaderMenuLink>
            <HeaderMenuLink
              aria-controls="basic-menu"
              aria-haspopup="true"
              onClick={(event) => {
                router.push("#");

                // Coming soon
                // router.push("/referral");
              }}
            >
              REFERRAL
            </HeaderMenuLink>
            <HeaderMenuLink
              aria-controls="basic-menu"
              aria-haspopup="true"
              onClick={(event) => {
                setCommunityMenu(event.currentTarget);
              }}
            >
              COMMUNITY <ArrowDropDownIcon />
            </HeaderMenuLink>
            <HeaderMenuLink
              aria-controls="basic-menu"
              aria-haspopup="true"
              onClick={(event) => {
                setMoreMenu(event.currentTarget);
              }}
            >
              MORE <ArrowDropDownIcon />

            </HeaderMenuLink>
            <HeaderMenuLink
              aria-controls="basic-menu"
              aria-haspopup="true"
              href="https://cd3fi.com/"
              target="_blank"
            >
              <Image src={CD3fiLogo} alt="logo" objectFit={"contain"} />
            </HeaderMenuLink>
            <HeaderMenu
              sx={{ mt: '45px' }}
              id="menu-market-appbar"
              anchorEl={marketMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(marketMenu)}
              onClose={() => {
                setMarketMenu(null);
              }}
            >
              {marketPlaceData.map((item) => (
                <MenuItem key={item.id} onClick={() => {
                  setMarketMenu(null);
                }}>
                  <Link href={item.link}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ width: "100%" }}>
                      <Stack>
                        <Typography component={"span"} variant={"subtitle1"}>{item.title}</Typography>
                        <Typography component={"span"} variant={"subtitle2"}>{item.subTitle}</Typography>
                      </Stack>
                      <Box>
                        <Image
                          src={"/assets/homepage/forwardIcon.svg"}
                          width={10}
                          height={10}
                        />
                      </Box>
                    </Stack>
                  </Link>
                </MenuItem>
              ))}
            </HeaderMenu>
            <HeaderMenu
              sx={{ mt: '45px' }}
              id="menu-more-appbar"
              anchorEl={communityMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(communityMenu)}
              onClose={() => {
                setCommunityMenu(null);
              }}
            >
              {socialData.map((item) => (
                <MenuItem key={item.id} onClick={() => {
                  setMoreMenu(null);
                }}>
                  <a target="_blank" href={item.link}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ width: "100%" }}>
                      <Stack>
                        <Typography component={"span"} variant={"subtitle1"} sx={{ paddingY: "14px" }}>{item.title}</Typography>
                      </Stack>
                      <Box>
                        <Image
                          src={"/assets/homepage/forwardIcon.svg"}
                          width={10}
                          height={10}
                        />
                      </Box>
                    </Stack>
                  </a>
                </MenuItem>
              ))}
            </HeaderMenu>
            <HeaderMenu
              sx={{ mt: '45px' }}
              id="menu-more-appbar"
              anchorEl={moreMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(moreMenu)}
              onClose={() => {
                setMoreMenu(null);
              }}
            >
              {moreData.map((item) => (
                <MenuItem key={item.id} onClick={() => {
                  setMoreMenu(null);
                }}>
                  <a target="_blank" href={item.link}>
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ width: "100%" }}>
                      <Stack>
                        <Typography component={"span"} variant={"subtitle1"}>{item.title}</Typography>
                        <Typography component={"span"} variant={"subtitle2"}>{item.subTitle}</Typography>
                      </Stack>
                      <Box>
                        <Image
                          src={"/assets/homepage/forwardIcon.svg"}
                          width={10}
                          height={10}
                        />
                      </Box>
                    </Stack>
                  </a>
                </MenuItem>
              ))}
            </HeaderMenu>
          </Box> :
          <Box sx={{ flexGrow: 1 }}>
            <HeaderMenuLink
              aria-controls="basic-menu"
              aria-haspopup="true"
              onClick={() => {
                router.push("/swap");
              }} 
            >
              TRADE 
            </HeaderMenuLink>
            <HeaderMenuLink
              aria-controls="basic-menu"
              aria-haspopup="true"
              onClick={() => {
                router.push("/liquidity");
              }} 
            >
              LIQUIDITY
            </HeaderMenuLink>
            <HeaderMenuLink
              aria-controls="basic-menu"
              aria-haspopup="true"
              onClick={() => {
                router.push("/farming");
              }} 
            >
              FARMING
            </HeaderMenuLink>
            <HeaderMenuLink
              aria-controls="basic-menu"
              aria-haspopup="true"
              onClick={() => {
                router.push("/token_sales");
              }} 
            >
              TOKEN SALES
            </HeaderMenuLink>
            <HeaderMenuLink
              aria-controls="basic-menu"
              aria-haspopup="true"
              onClick={() => {
                router.push("/create_token_sales");
              }} 
            >
              CREATE TOKEN SALES
            </HeaderMenuLink>
            <HeaderMenuLink
              aria-controls="basic-menu"
              aria-haspopup="true"
              onClick={() => {
                router.push("/staking");
              }} 
            >
              STAKING
            </HeaderMenuLink>
          </Box>}
          {router.pathname !== '/' ? <WalletHeaderComponent
            wallet={account}
            busd={currencyBalances[1]?.toSignificant(6) ?? '-'}
            cd3d={currencyBalances[0]?.toSignificant(12) ?? '-'} /> : <HeaderClient />
          }
        </Stack>
        <DrawerComponent />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Image from "next/image";

import useAuth from '../../hooks/useAuth';
import MetamaskIcon from '../../public/assets/metamask.svg'
import BinanceIcon from '../../public/assets/binance.svg'



export function WalletModal(props) {

  const { login, logout } = useAuth()

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleConnectClick = (connector) => {
    login(connector);
  }

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"sm"} fullWidth={true}>
      <DialogTitle>Select Your Wallet</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem button onClick={() => handleConnectClick("Injected")}>
          <Avatar sx={{ borderRadius: "0 !important", backgroundColor: "transparent", marginRight: "1rem" }}>
            <Image src={MetamaskIcon} alt="MMIcon" />
          </Avatar>
          <ListItemText primary="Metamask" />
        </ListItem>

        <ListItem autoFocus button onClick={() => handleConnectClick('BSC')}>
          <ListItemAvatar>
            <Avatar sx={{ borderRadius: "0 !important", backgroundColor: "transparent" }}>
              <Image src={BinanceIcon} alt="Binance" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Binance Chain Wallet" />
        </ListItem>
      </List>
    </Dialog>
  );
}

WalletModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

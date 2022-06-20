import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import SearchIcon from '@mui/icons-material/Search';
import DialogTitle from '@mui/material/DialogTitle';
import { TokenSalesDetailFilledButton, TokenSalesDetailOutlineButton } from '../token_sales_detail_widget';
import { TokenSaleModalLayout } from './modal_widget';
import TokenSalesSearchField from '../TokenSalesSearchField';
import { TokenSalesSearchButton } from '../token_sales_widget';
import { Box, InputAdornment, Stack } from '@mui/material';
import DataTable from './table';

export default function TokenSaleModal() {
  const [open, setOpen] = React.useState(false);
  const [searchAddress, setSearchAddress] = React.useState()
  const [address, setAddress] = React.useState()

  const handleAddressSearch = (e) => {
    setAddress(e.target.value)
  }

  const clickSearchButton = () => {
    setSearchAddress(address)
  }

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <TokenSalesDetailOutlineButton variant={"outlined"} size={"large"} onClick={handleClickOpen()}>
        List of Contributors
      </TokenSalesDetailOutlineButton>
      <TokenSaleModalLayout
        open={open}
        onClose={handleClose}
        scroll={"body"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle sx={{ color: '#75E4AA' }} id="scroll-dialog-title">Contributors</DialogTitle>
        <TokenSalesSearchField
          id={"token_sales_search"}
          style={{ padding: "0 20px" }}
          onChange={(e) => handleAddressSearch(e)}
          InputProps={{
            placeholder: "Search address",
            disableUnderline: true,
            endAdornment: <InputAdornment position={"end"}>
              <TokenSalesSearchButton onClick={clickSearchButton} aria-label="search">
                <SearchIcon />
              </TokenSalesSearchButton>
            </InputAdornment>
          }}
        />
        <Box>
          <DataTable searchAddress={searchAddress} />
        </Box>
        <Stack >
          <TokenSalesDetailFilledButton sx={{ margin: "auto", marginBottom: "20px" }} onClick={handleClose}>Export as .CSV</TokenSalesDetailFilledButton>
        </Stack>
      </TokenSaleModalLayout>
    </div>
  );
}

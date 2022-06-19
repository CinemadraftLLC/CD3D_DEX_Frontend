import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SearchIcon from '@mui/icons-material/Search';
import DialogTitle from '@mui/material/DialogTitle';
import { TokenSalesDetailOutlineButton } from '../token_sales_detail_widget';
import { TokenSaleModalLayout } from './modal_widget';
import TokenSalesSearchField from '../TokenSalesSearchField';
import { TokenSalesSearchButton } from '../token_sales_widget';
import { InputAdornment } from '@mui/material';

export default function TokenSaleModal() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
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
      <TokenSalesDetailOutlineButton variant={"outlined"} size={"large"} onClick={handleClickOpen('paper')}>
        List of Contributors
      </TokenSalesDetailOutlineButton>
      <TokenSaleModalLayout
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <TokenSalesSearchField
          id={"token_sales_search"}
          style={{ padding: "20px" }}
          InputProps={{
            placeholder: "Search address",
            disableUnderline: true,
            endAdornment: <InputAdornment position={"end"}>
              <TokenSalesSearchButton aria-label="search">
                <SearchIcon />
              </TokenSalesSearchButton>
            </InputAdornment>
          }}
        />
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </TokenSaleModalLayout>
    </div>
  );
}

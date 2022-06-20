import { styled } from "@mui/material/styles";
import Dialog from '@mui/material/Dialog';
import { Button } from "@mui/material";

export const TokenSaleModalLayout = styled(Dialog)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.17)',
  '& .MuiPaper-root': {
    backgroundColor: '#1D162D',
    color: "#EAFBF3"
  },
  '& .css-qfso29-MuiTypography-root-MuiDialogContentText-root': {
    color: "#EAFBF3"
  }
}));

export const PaginationButton = styled(Button)(({ theme, fontColor, bgColor }) => ({
  color: fontColor,
  minWidth: "30px !important",
  height: "30px",
  margin: "20px 5px",
  border: `1px solid ${fontColor}`,
  backgroundColor: bgColor,
  '&:disabled': {
    "border": "none"
  }
}))
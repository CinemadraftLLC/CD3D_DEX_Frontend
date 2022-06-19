import { styled } from "@mui/material/styles";
import Dialog from '@mui/material/Dialog';

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
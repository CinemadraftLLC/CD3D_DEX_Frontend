import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import rows from './address.json'
import { Stack } from '@mui/material';
import { PaginationButton } from './modal_widget';

export default function CustomPaginationActionsTable({ searchAddress }) {
  const [page, setPage] = React.useState(0);
  const [addressList, setAddressList] = React.useState(rows)

  console.log(addressList)
  const rowsPerPage = 10;
  const pageNumber = Math.floor(addressList.length / rowsPerPage + 1);
  console.log(pageNumber, "Pge")
  // Avoid a layout jump when reaching the last page with empty rows.
  React.useEffect(() => {
    if (!searchAddress) return;
    const newRows = rows.filter((element) => {
      return element.address === searchAddress;
    })
    setAddressList(newRows)
    return () => {
      setAddressList(rows);
    }
  }, [searchAddress])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          <TableRow>
            <TableCell style={{ width: 40, color: "#75E4AA", border: "none", padding: "5px 16px" }} align="center">
              No.
            </TableCell>
            <TableCell style={{ width: 160, color: "#75E4AA", border: "none", padding: "5px 16px" }} align="center">
              {`Address(${addressList.length})`}
            </TableCell>
            <TableCell style={{ width: 40, color: "#75E4AA", border: "none", padding: "5px 16px" }} align="center">
            </TableCell>
            <TableCell style={{ width: 40, color: "#75E4AA", border: "none", padding: "5px 16px" }} align="center">
              Amount
            </TableCell>
          </TableRow>
          {(rowsPerPage > 0
            ? addressList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : addressList
          ).map((row, i) => (
            <TableRow key={i}>
              <TableCell style={{ width: 40, color: "#EAFBF3", border: "none", padding: "5px 16px" }} align="center">
                {i + (page) * 10 + 1}
              </TableCell>
              <TableCell style={{ width: 160, color: "#EAFBF3", border: "none", padding: "5px 16px" }} align="center">
                {row.address}
              </TableCell>
              <TableCell style={{ width: 160, color: "#EAFBF3", border: "none", padding: "5px 16px" }} align="center">
                <ContentCopyIcon sx={{ cursor: "pointer" }} htmlColor='#FF0144' fontSize='small' />
              </TableCell>
              <TableCell style={{ width: 160, color: "#EAFBF3", border: "none", padding: "5px 16px" }} align="center">
                {row.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack direction={"row"} justifyContent={"center"}>
        <PaginationButton fontColor={"#FF0144"} disabled={page === 0 ? "true" : ""} onClick={() => setPage(prev => prev - 1)}>{'<'}</PaginationButton>
        {
          Array(pageNumber).fill().map((item, i) => (
            <PaginationButton fontColor={"#EAFBF3"} bgColor={i === page ? "#2BD67B" : "transparent"} key={i} onClick={() => setPage(i)}>{i + 1}</PaginationButton>
          ))
        }
        <PaginationButton fontColor={"#FF0144"} disabled={page === pageNumber - 1 ? "true" : ""} onClick={() => setPage(prev => prev + 1)}>{'>'}</PaginationButton>
      </Stack>
    </TableContainer>
  );
}

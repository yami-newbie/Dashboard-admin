import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Stack, TablePagination } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Manufacturer } from 'models';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Props {
   headers: GridColDef[],
   rows: (Object & { _data: any })[],
   page: number,
   totalItems: number,
   rowsPerPage: number,
   onHandleEditButton: (item: Manufacturer) => void,
   onHandleDeleteButton: (id: string) => void,
   handleChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void,
   handleChangeRowsPerPage: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
}

export default function CustomTable(props: Props) {
   const { headers, rows, page, totalItems, rowsPerPage, handleChangePage, handleChangeRowsPerPage, onHandleEditButton, onHandleDeleteButton } = props

   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow >
                  <StyledTableCell>#</StyledTableCell>
                  {(headers || []).map((item, index) => (
                     <StyledTableCell key={index}>{item.headerName}</StyledTableCell>
                  ))}
                  <StyledTableCell>Actions</StyledTableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {rows.map((row: any, index) => {

                  const rawData = {...row._data} as Manufacturer

                  console.log(row);

                  const _row = {...row}

                  delete _row._data

                  const array: any[] = Object.keys(_row).map(key => _row[key])

                  return (
                     <StyledTableRow 
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        {
                           array.map((item, index) => (
                              <StyledTableCell key={index}>{item}</StyledTableCell>
                           ))
                        }
                        <StyledTableCell>
                           <Stack direction="row" spacing={1}>
                              <IconButton onClick={() => { onHandleEditButton(rawData) }}>
                                 <ModeEditIcon/>
                              </IconButton>
                              <IconButton onClick={() => { onHandleDeleteButton(rawData.id) }}>
                                 <DeleteIcon/>
                              </IconButton>
                           </Stack>
                        </StyledTableCell>
                     </StyledTableRow>
                  )
               })}
            </TableBody>
         </Table>
         <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
         />
      </TableContainer>
   );
}
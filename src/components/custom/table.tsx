import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { GridColDef } from '@mui/x-data-grid'
import {
   Avatar,
   Box,
   CircularProgress,
   Divider,
   IconButton,
   Skeleton,
   Stack,
   Typography
} from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ConfirmDialog } from 'components/productType/confirm-dialog'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import { Pagination } from '@mui/lab'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14
   }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
   },
   // hide last border
   '&:last-child td, &:last-child th': {
      border: 0
   }
}))

interface Props {
   headers: GridColDef[]
   rows: (Object & { _data: any })[]
   page: number
   totalItems: number
   rowsPerPage: number
   subButton?: boolean
   loading: boolean
   onHandleEditButton: (item: any) => void
   onHandleDeleteButton: (id: string) => void
   onHandleSubButton?: (id: string) => void
   handleChangePage: (event: React.ChangeEvent<unknown>, page: number) => void

   handleChangeRowsPerPage:
   | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
   | undefined
}

export default function CustomTable(props: Props) {
   const {
      headers,
      rows,
      totalItems,
      rowsPerPage,
      loading,
      handleChangePage,
      onHandleEditButton,
      onHandleDeleteButton,
      onHandleSubButton,
      subButton = false
   } = props
   const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false)
   const [id, setId] = React.useState('')

   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  {(headers || []).map((item, index) => (
                     <StyledTableCell key={index}>{item.headerName}</StyledTableCell>
                  ))}
                  <StyledTableCell>Actions</StyledTableCell>
               </TableRow>
            </TableHead>

            {!loading ? (
               <TableBody>
                  {rows.map((row: any, index) => {
                     const rawData = { ...row._data }

                     const _row = { ...row }

                     delete _row._data

                     const array: any[] = Object.keys(_row).map(key => _row[key])

                     return (
                        <StyledTableRow
                           key={index}
                           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                           <StyledTableCell>{index + 1}</StyledTableCell>
                           {array.map((item, index) => (
                              <StyledTableCell
                                 sx={{ maxWidth: '300px', overflow: 'hidden' }}
                                 key={index}
                              >
                                 <Typography textOverflow="ellipsis">{item}</Typography>
                              </StyledTableCell>
                           ))}
                           <StyledTableCell>
                              <Stack direction="row" spacing={1}>
                                 <IconButton
                                    onClick={() => {
                                       onHandleEditButton(rawData)
                                    }}
                                 >
                                    <ModeEditIcon />
                                 </IconButton>
                                 <IconButton
                                    onClick={() => {
                                       setId(rawData.id), setOpenConfirmDialog(true)
                                    }}
                                 >
                                    <DeleteIcon />
                                 </IconButton>
                                 {subButton && (
                                    <IconButton
                                       onClick={() => {
                                          if (onHandleSubButton) onHandleSubButton(rawData.id)
                                       }}
                                    >
                                       <AddToPhotosIcon />
                                    </IconButton>
                                 )}
                              </Stack>
                           </StyledTableCell>
                        </StyledTableRow>
                     )
                  })}
               </TableBody>
            ) : (
               null
            )}
         </Table>
         {
            loading ? (
            <Stack width="100%">
               {Array(5).fill(2).map(_ => (
                  <Skeleton animation="wave" height="64px" />
               ))}
            </Stack>
            ) : null
         }
         <Divider />
         <Stack width="100%" alignItems="center" my={2}>
            <Pagination onChange={handleChangePage} count={Math.ceil(totalItems / rowsPerPage)} variant="outlined" color="primary" />
         </Stack>
         <ConfirmDialog
            icon={
               <Avatar sx={{ bgcolor: 'rgba(209, 67, 67, 0.08)', color: 'rgb(209, 67, 67)' }}>
                  <ReportProblemIcon />
               </Avatar>
            }
            isOpen={openConfirmDialog}
            title="Are you sure?"
            body="Are you sure to delete this customer?"
            onSubmit={() => {
               onHandleDeleteButton(id)
               setOpenConfirmDialog(false)
            }}
            onClose={() => setOpenConfirmDialog(false)}
         />
      </TableContainer>
   )
}

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
   Avatar,
   Box,
   IconButton,
   Skeleton,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   TableSortLabel,
   Tooltip,
   Typography
} from '@mui/material'
import { SeverityPill } from 'components/severity-pill'
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { HeadCell, Order, OrderStatus } from 'models'
import { useState } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { ConfirmDialog } from 'components/productType/confirm-dialog';
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

const headCells: HeadCell[] = [
   {
      id: 'name',
      align: 'left',
      label: 'Khách hàng',
      sortable: false
   },
   // {
   //    id: 'products',
   //    align: 'left',
   //    label: 'Products',
   //    sortable: false
   // },
   {
      id: 'createdAt',
      align: 'center',
      label: 'Ngày tạo đơn',
      sortable: false
   },
   {
      id: 'amount',
      align: 'center',
      label: 'Tổng tiền',
      sortable: false
   },
   {
      id: 'payment',
      align: 'center',
      label: 'Phương thức thanh toán',
      sortable: false
   },
   {
      id: 'status',
      align: 'center',
      label: 'Trạng thái',
      sortable: false
   },
   {
      id: 'actions',
      align: 'center',
      label: 'Hành động',
      sortable: false
   }
]

export const OrderListResults = ({
   orderList,
   onSortByColumn,
   onDeleteOrder,
   ...rest
}: {
   orderList?: Order[]
   onRowClick?: (order: Order) => void
   onSortByColumn?: Function
   onDeleteOrder: (id: string) => void
}) => {
   const [order, setOrder] = useState<'asc' | 'desc'>('asc')
   const [orderBy, setOrderBy] = useState('')
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
   const [deleteId, setDeleteId] = useState<string | null>(null)

   const handleSort = (property: string) => async (event: React.MouseEvent) => {
      if (onSortByColumn) {
         const isAsc = orderBy === property && order === 'asc'
         setOrder(isAsc ? 'desc' : 'asc')
         setOrderBy(property)
         onSortByColumn(`${property}-${isAsc ? 'desc' : 'asc'}`)
      }
   }

   const handleDeleteOrder = () => {
      if(deleteId) {
         onDeleteOrder(deleteId)
      }
      setOpenConfirmDialog(false)
   }

   return (
      <>
         <Table {...rest}>
            <TableHead>
               <TableRow>
                  {headCells.map(cell => (
                     <TableCell
                        key={cell.id}
                        align={cell.align}
                        sortDirection={orderBy === cell.id ? order : false}
                     >
                        {cell.sortable && onSortByColumn ? (
                           <TableSortLabel
                              active={orderBy === cell.id}
                              direction={orderBy === cell.id ? order : 'asc'}
                              onClick={handleSort(cell.id)}
                           >
                              {cell.label}
                           </TableSortLabel>
                        ) : (
                           cell.label
                        )}
                     </TableCell>
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {orderList
                  ? (
                     orderList.length > 0 ? 
                     orderList.map((order: Order) => (
                        <TableRow hover key={order.id}>
                           <TableCell align="left" sx={{ minWidth: 200 }}>
                              <Stack spacing={2} alignItems="center" direction="row">
                                 <Link href={`/users/${order?.user?.id}`} passHref>
                                    <Avatar src={order?.user?.medias?.[0]?.filePath} />
                                 </Link>
                                 <Typography
                                    sx={{
                                       cursor: 'pointer',
                                       ':hover': {
                                          textDecoration: 'underline'
                                       },
                                       fontWeight: 500
                                    }}
                                    variant="body2"
                                 >
                                    {order?.user?.fullname}
                                 </Typography>
                              </Stack>
                           </TableCell>
                           <TableCell align="center" sx={{ pr: 5 }}>
                              {moment(order.createdAt || undefined).format('DD/MM/YYYY')}
                           </TableCell>
                           <TableCell align="center" sx={{ pr: 5 }}>
                              {order?.receipts?.totalPrice.toFixed(2)}{order?.receipts?.payments?.customerPayment?.paymentMethods?.currency}
                           </TableCell>
                           <TableCell align="center">{order?.receipts?.payments?.customerPayment?.paymentMethods?.name}</TableCell>
                           <TableCell align="center" sx={{ minWidth: 200 }}>
                              <SeverityPill
                                 color={
                                    {
                                       accept: '#2196f3',
                                       packaging: '#ffc400',
                                       shipping: '#00e5ff',
                                       receive: '#76ff03',
                                       done: '#f50057',
                                       cancel: '#d500f9'
                                    }[order.status || '#2196f3']
                                 }
                              >
                                 {OrderStatus[order?.status].label}
                              </SeverityPill>
                           </TableCell>
                           <TableCell align="center">
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                 {/* <Tooltip title="Hủy đơn" placement="top">
                                    <IconButton size="small" disabled={(order?.status === OrderStatus.cancel.value) || (order?.status === OrderStatus.done.value)}>
                                       <CancelIcon width={20} />
                                    </IconButton>
                                 </Tooltip> */}

                                 <Tooltip title="Xóa đơn hàng" placement="top">
                                    <IconButton size="small" onClick={() => { setOpenConfirmDialog(true); setDeleteId(order.id) }}>
                                       <DeleteIcon fontSize="small" />
                                    </IconButton>
                                 </Tooltip>

                                 <Link href={`/orders/${order.id}`} passHref>
                                    <Tooltip title="Xem chi tiết" placement="top">
                                       <IconButton size="small">
                                          <ArrowForwardIcon fontSize="small" />
                                       </IconButton>
                                    </Tooltip>
                                 </Link>
                              </Box>
                           </TableCell>
                        </TableRow>
                     )) : (
                        <TableCell colSpan={6}>
                           <Stack alignItems="center">
                              <Typography variant="h6" component="div">Không có đơn hàng nào</Typography>
                           </Stack>
                        </TableCell>
                     )
                  )
                  : Array.from(new Array(10)).map((item, idx) => (
                     <TableRow hover key={idx}>
                        <TableCell align="left">
                           <Skeleton variant="text" />
                        </TableCell>
                        <TableCell align="left">
                           <Skeleton variant="text" />
                        </TableCell>
                        <TableCell align="center">
                           <Skeleton variant="text" />
                        </TableCell>
                        <TableCell align="center">
                           <Skeleton variant="text" />
                        </TableCell>
                        <TableCell align="center">
                           <Skeleton variant="text" />
                        </TableCell>
                        <TableCell align="center">
                           <Skeleton variant="text" />
                        </TableCell>
                        <TableCell align="center">
                           <Skeleton variant="text" />
                        </TableCell>
                     </TableRow>
                  ))}
            </TableBody>
         </Table>
         <ConfirmDialog
            icon={
               <Avatar sx={{ bgcolor: 'rgba(209, 67, 67, 0.08)', color: 'rgb(209, 67, 67)' }}>
                  <ReportProblemIcon />
               </Avatar>
            }
            isOpen={openConfirmDialog}
            title="Bạn chắc chưa?"
            body="Bạn có chắc chắn muốn xóa đơn hàng?"
            onSubmit={handleDeleteOrder}
            onClose={() => setOpenConfirmDialog(false)}
         />
      </>
   )
}

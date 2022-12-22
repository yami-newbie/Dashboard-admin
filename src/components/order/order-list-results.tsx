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
import PencilIcon from 'icons/pencil'
import { HeadCell, Order, PaginationParams } from 'models'
import { useState } from 'react'
import Link from 'next/link'
import moment from 'moment'

const headCells: HeadCell[] = [
   {
      id: 'name',
      align: 'left',
      label: 'Customer',
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
      label: 'Ordered Date',
      sortable: false
   },
   {
      id: 'amount',
      align: 'center',
      label: 'Price',
      sortable: false
   },
   {
      id: 'payment',
      align: 'center',
      label: 'Payment',
      sortable: false
   },
   {
      id: 'status',
      align: 'center',
      label: 'Status',
      sortable: false
   },
   {
      id: 'actions',
      align: 'center',
      label: 'Actions',
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

   const handleSort = (property: string) => async (event: React.MouseEvent) => {
      if (onSortByColumn) {
         const isAsc = orderBy === property && order === 'asc'
         setOrder(isAsc ? 'desc' : 'asc')
         setOrderBy(property)
         onSortByColumn(`${property}-${isAsc ? 'desc' : 'asc'}`)
      }
   }
   return (
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
                                 <Avatar src={order.user.medias?.[0]?.filePath} />
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
                                 {order.user.fullname}
                              </Typography>
                           </Stack>
                        </TableCell>
                        {/* <TableCell align="left">
                             <Box sx={{ display: 'flex', alignItems: 'end', gap: 1 }}>
                                {order.slice(0, 3).map(product => (
                                   <Tooltip
                                      key={product.productId}
                                      title={product.title}
                                      placement="top"
                                   >
                                      <Avatar variant="rounded" src={product.img} />
                                   </Tooltip>
                                ))}
                                {order.products.length > 3 && (
                                   <Tooltip title="and more..." placement="top">
                                      <Box sx={{ height: '100%' }}>
                                         <Typography>...</Typography>
                                      </Box>
                                   </Tooltip>
                                )}
                             </Box>
                          </TableCell> */}
                        <TableCell align="center" sx={{ pr: 5 }}>
                           {moment().format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell align="center" sx={{ pr: 5 }}>
                           {order.receipts.totalPrice.toFixed(2)}{order?.receipts?.payments?.customerPayment?.paymentMethods?.currency}
                        </TableCell>
                        <TableCell align="center">{order?.receipts?.payments?.customerPayment?.paymentMethods?.name}</TableCell>
                        <TableCell align="center" sx={{ minWidth: 200 }}>
                           <SeverityPill
                              color={
                                 {
                                    PENDING: 'info',
                                    DELIVERIED: 'secondary',
                                    REFUNDED: 'error',
                                    PROCESSING: 'primary',
                                    CANCELED: 'warning'
                                 }[order.status || 'PENDING']
                              }
                           >
                              {order?.status}
                           </SeverityPill>
                        </TableCell>
                        <TableCell align="center">
                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {/* <Link href={`/orders/${order.id}/edit`} passHref>
                                 <Tooltip title="Edit Order" placement="top">
                                    <IconButton size="small">
                                       <PencilIcon width={20} />
                                    </IconButton>
                                 </Tooltip>
                              </Link> */}
                              <Tooltip title="View Details" placement="top">
                                 <IconButton size="small" onClick={() => { onDeleteOrder(order.id) }}>
                                    <DeleteIcon fontSize="small" />
                                 </IconButton>
                              </Tooltip>
                              <Link href={`/orders/${order.id}`} passHref>
                                 <Tooltip title="View Details" placement="top">
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
   )
}

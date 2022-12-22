import {
   Avatar,
   Box,
   Card,
   CardContent,
   CardHeader,
   Divider,
   IconButton,
   Skeleton,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Tooltip,
   Typography
} from '@mui/material'
import { OrderListResults } from 'components/order/order-list-results'
import { SeverityPill } from 'components/severity-pill'
import React, { useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Order } from 'models'
import { format, parseISO } from 'date-fns'
import PencilIcon from 'icons/pencil'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ORDERS_QUERY from 'graphql/query/orders'
import { useQuery } from '@apollo/client'

export interface CustomerOrderListCardProps { }

export function CustomerOrderListCard(props: CustomerOrderListCardProps) {
   const router = useRouter()
   const { customerId } = router.query
   const [orders, setOrders] = useState<Order[]>([])
   const { data: _orderList } = useQuery(ORDERS_QUERY, { variables: { input: { usersId: [customerId] } } })

   useEffect(() => {
      if(_orderList) {
         const _data = _orderList.orders
         setOrders(_data.orders)
      }
   }, [_orderList])

   return (
      <Card>
         <CardHeader title="Lịch sử mua hàng" />
         <Divider />
         <CardContent sx={{ p: 0 }}>
            <PerfectScrollbar>
               <Box sx={{ width: '100%' }}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell align="center">Ngày đặt hàng</TableCell>
                           <TableCell>Sản phẩm</TableCell>
                           <TableCell align="center">Số lượng</TableCell>
                           <TableCell align="center">Hình thức thanh toán</TableCell>
                           <TableCell align="center">Trạng thái</TableCell>
                           <TableCell align="center">Hành động</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {orders
                           ? orders.map((order: Order) => (
                              <TableRow hover key={order.id}>
                                 <TableCell align="center">
                                    {format(parseISO(order.createdAt), 'dd/MM/yyyy')}
                                 </TableCell>
                                 <TableCell align="left">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                       {order?.receipts.receiptDetails.slice(0, 3).map(product => (
                                            <Tooltip
                                               key={product.productId}
                                               title={product?.products?.productTypes?.name}
                                               placement="top"
                                            >
                                               <Avatar variant="rounded" src={product?.products?.productTypes?.medias?.[9]?.filePath} />
                                            </Tooltip>
                                         ))}
                                         {order.receipts.receiptDetails.length > 3 && (
                                            <Tooltip title="thêm..." placement="top">
                                               <Box sx={{ height: '100%' }}>
                                                  <Typography>...</Typography>
                                               </Box>
                                            </Tooltip>
                                         )}
                                    </Box>
                                 </TableCell>
                                 <TableCell align="center">{order?.receipts?.totalPrice.toFixed(2)}{order?.receipts?.payments?.customerPayment?.paymentMethods?.name}</TableCell>
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
                                       {order.status}
                                    </SeverityPill>
                                 </TableCell>
                                 <TableCell align="center">
                                    {/* <Link
                                       href={`/orders/${order.id}/edit`}
                                       passHref
                                    >
                                       <Tooltip title="Edit Order" placement="top">
                                          <IconButton size="small">
                                             <PencilIcon width={20} />
                                          </IconButton>
                                       </Tooltip>
                                    </Link> */}
                                    <Link href={`/orders/${order.id}`} passHref>
                                       <Tooltip title="View Details" placement="top">
                                          <IconButton size="small">
                                             <ArrowForwardIcon fontSize="small" />
                                          </IconButton>
                                       </Tooltip>
                                    </Link>
                                 </TableCell>
                              </TableRow>
                           ))
                           : Array.from(new Array(3)).map((i, idx) => (
                              <TableRow key={idx}>
                                 <TableCell>
                                    <Skeleton variant="text" />
                                 </TableCell>
                                 <TableCell>
                                    <Skeleton variant="text" />
                                 </TableCell>
                                 <TableCell>
                                    <Skeleton variant="text" />
                                 </TableCell>
                                 <TableCell>
                                    <Skeleton variant="text" />
                                 </TableCell>
                                 <TableCell>
                                    <Skeleton variant="text" />
                                 </TableCell>
                                 <TableCell>
                                    <Skeleton variant="text" />
                                 </TableCell>
                              </TableRow>
                           ))}
                     </TableBody>
                  </Table>
               </Box>
            </PerfectScrollbar>
         </CardContent>
      </Card>
   )
}

import {
   Box,
   Card,
   CardContent,
   CardHeader,
   Divider,
   List,
   ListItem,
   Skeleton,
   Typography
} from '@mui/material'
import axios, { AxiosResponse } from 'axios'
import { format, parseISO } from 'date-fns'
import { District, Order, Province, ResponseData, Ward } from 'models'
import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
export interface OrderBasicInfoCardProps {
   order?: Order
}

export function OrderBasicInfoCard({ order }: OrderBasicInfoCardProps) {

   return (
      <Card>
         <CardHeader title="Thông tin cơ bản" />
         <Divider />
         <CardContent sx={{ p: 0 }}>
            {order ? (
               <List>
                  <ListItem
                     sx={{ px: 3, py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Thông tin giao hàng
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="primary">
                           {order.user && (
                              <Link href={`/customers/${order.user.id}`} passHref>
                                 {order.user?.fullname}
                              </Link>
                           )}
                        </Typography>
                        
                     </Box>
                  </ListItem>
                  <Divider />

                  <ListItem
                     sx={{ px: 3, py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        ID
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                           {order.id}
                        </Typography>
                     </Box>
                  </ListItem>
                  <Divider />

                  <ListItem
                     sx={{ px: 3, py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Ngày tạo đơn
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                           {/* {parseISO(order.createdAt)} */}
                           {order.createdAt &&
                              format(parseISO(order.createdAt), 'dd/MM/yyyy HH:mm')}
                        </Typography>
                     </Box>
                  </ListItem>
                  <Divider />

                  <ListItem
                     sx={{ px: 3, py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Phương thức thanh toán
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text">
                           {order.receipts.payments.customerPayment.paymentMethods.name}
                        </Typography>
                     </Box>
                  </ListItem>
                  <Divider />

                  <ListItem
                     sx={{ px: 3, py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Tổng cộng
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text">
                           {order.receipts.totalPrice.toFixed(2)}{order.receipts.payments.customerPayment.paymentMethods.currency}
                        </Typography>
                     </Box>
                  </ListItem>
                  <Divider />

                  <ListItem
                     sx={{ px: 3, pt: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Trạng thái
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography
                           variant="body2"
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
                        </Typography>
                     </Box>
                  </ListItem>
               </List>
            ) : (
               <List>
                  {Array.from(new Array(6)).map((i, idx) => (
                     <ListItem key={idx} sx={{ px: 3, pt: 1.5 }} alignItems="center" disablePadding>
                        <Skeleton variant="text" sx={{ flex: 1, mb: 1 }} height={40} />
                        <Divider />
                     </ListItem>
                  ))}
               </List>
            )}
         </CardContent>
      </Card>
   )
}

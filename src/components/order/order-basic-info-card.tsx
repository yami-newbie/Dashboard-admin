import {
   Box,
   Button,
   Card,
   CardContent,
   CardHeader,
   Chip,
   Divider,
   IconButton,
   List,
   ListItem,
   Skeleton,
   Stack,
   Typography
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Order, OrderPayload, OrderStatus, StatusList } from 'models'
import React from 'react'
import Link from 'next/link'
import moment from 'moment'

export interface OrderBasicInfoCardProps {
   order?: Order,
   cancelOrder: (id: string) => any,
   updateOrder: (payload: OrderPayload) => any
}

export function OrderBasicInfoCard({ order, cancelOrder, updateOrder }: OrderBasicInfoCardProps) {

   if (!order) return <></>

   const status = OrderStatus[order.status]

   if (!status) return <></>

   const handleChangeStatus = () => {
      updateOrder({
         id: order.id,
         addressFrom: order.addressFrom,
         addressTo: order.addressTo,
         status: OrderStatus[StatusList[status?._key % 6]].value
      } as OrderPayload)
   }
   return (
      <Card>
         <CardHeader title="Thông tin cơ bản" action={
            <Button variant="outlined" onClick={() => { if (order) cancelOrder(order.id) }} disabled={(order?.status === OrderStatus.cancel.value)}>Huỷ đơn hàng</Button>
         } />
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
                           {order.users ? (
                              <Link href={`/customers/${order.users.id}`} passHref>
                                 {order.users?.fullname}
                              </Link>
                           ) : "Không có thông tin khách hàng"} - {order.addressTo || "Không có địa chỉ giao hàng"}
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
                           {moment(order.createdAt || undefined).format('DD/MM/YYYY HH:mm')}
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
                           {order.receipts?.payments?.customerPayments?.paymentMethods?.name}
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
                           {order.receipts?.totalPrice.toFixed(2)}{order.receipts?.payments?.customerPayments?.paymentMethods?.currency}
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
                     <Stack sx={{ flex: 1 }} direction="row" spacing={2} alignItems="center">
                        <Typography
                           variant="body2"
                           color={
                              {
                                 accept: '#2196f3',
                                 packaging: '#ffc400',
                                 shipping: '#00e5ff',
                                 receive: '#76ff03',
                                 done: '#f50057',
                                 cancel: '#d500f9'
                              }[status?.value || 'accept']
                           }
                        >
                           {status?.label}
                        </Typography>
                        {
                           OrderStatus[StatusList[status?._key % 6]].value !== 'accept' ?
                              <>
                                 <ArrowForwardIcon fontSize="small" />

                                 <Button
                                    onClick={handleChangeStatus}
                                    variant="outlined"
                                    sx={{
                                       color: {
                                          accept: '#2196f3',
                                          packaging: '#ffc400',
                                          shipping: '#00e5ff',
                                          receive: '#76ff03',
                                          done: '#f50057',
                                          cancel: '#d500f9'
                                       }[OrderStatus[StatusList[status?._key % 6]].value || 'accept']
                                    }}
                                 >
                                    {OrderStatus[StatusList[status?._key % 6]]?.label}
                                 </Button>
                              </> : null
                        }
                     </Stack>
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
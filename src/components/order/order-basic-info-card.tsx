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
         <CardHeader title="Basic info" />
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
                        Delivery information
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
                        Date
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
                        Payment Method
                     </Typography>
                     {/* <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text">
                           {order.payment}
                        </Typography>
                     </Box> */}
                  </ListItem>
                  <Divider />

                  <ListItem
                     sx={{ px: 3, py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Total Amount
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        {/* <Typography variant="body2" color="text">
                           ${order.amount.toFixed(2)}
                        </Typography> */}
                     </Box>
                  </ListItem>
                  <Divider />

                  <ListItem
                     sx={{ px: 3, pt: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Status
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

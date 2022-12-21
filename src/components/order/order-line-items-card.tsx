import {
   Avatar,
   Card,
   CardContent,
   CardHeader,
   Divider,
   Skeleton,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { Order } from 'models'
import React from 'react'

export interface OrderLineItemsCardProps {
   order?: Order
}

export function OrderLineItemsCard({ order }: OrderLineItemsCardProps) {
   return (
      <Card>
         <CardHeader title="Danh sách sản phẩm" />
         <Divider />
         <CardContent sx={{ p: 0 }}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Sản phẩm</TableCell>
                     <TableCell align="center">Loại sản phẩm</TableCell>
                     <TableCell align="center">Hãng sản xuất</TableCell>
                     <TableCell align="center">Số lượng</TableCell>
                     <TableCell align="center">Thành tiền</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {order
                     ? order.receipts.receiptDetails.map(item => (
                        <TableRow hover key={item?.productId}>
                           <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                 <Avatar variant="rounded" src={item?.products?.productTypes?.medias?.[0]?.filePath}></Avatar>
                                 <Typography variant="body2">{item?.products?.productTypes?.name}</Typography>
                              </Box>
                           </TableCell>
                           <TableCell align="center">{item?.products?.productTypes?.name}</TableCell>
                           <TableCell align="center">{item?.products?.manufactureInfos?.manufacturers?.name}</TableCell>
                           <TableCell align="center">{item?.amount}</TableCell>
                           <TableCell align="center">{item?.price * item?.amount}{order?.receipts?.payments?.customerPayment?.paymentMethods?.currency}</TableCell>
                        </TableRow>
                     ))
                     : Array.from(new Array(5)).map((i, idx) => (
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
                        </TableRow>
                     ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
   )
}

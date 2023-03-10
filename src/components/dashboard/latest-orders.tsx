import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
   Avatar,
   Box,
   Button,
   Card,
   CardHeader,
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
import PencilIcon from 'icons/pencil'
import { Order } from 'models/order'
import NextLink from 'next/link'
import PerfectScrollbar from 'react-perfect-scrollbar'
import useSWR from 'swr'
import { SeverityPill } from '../severity-pill'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Link from 'next/link'

const NUMBER_ORDERS: number = 6

export const LatestOrders = (props: any) => {
   // const { data: orders } = useSWR(
   //    `orders?page=1&pageSize=${NUMBER_ORDERS}&orderBy=createdAt-desc`,
   //    {
   //       revalidateOnFocus: true
   //    }
   // )

   return (
      <Card {...props}>
         <CardHeader sx={{ fontWeight: 'bold' }} title="Latest Orders" />
         <PerfectScrollbar>
            <Box>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell align="left">Customer</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {props.orders
                        ? props.orders.map((order: Order) => (
                             <TableRow hover key={order.id}>
                                <TableCell align="left">
                                   <Link href={`customers/${order.users.id}`} passHref>
                                      <Typography
                                         sx={{
                                            cursor: 'pointer',
                                            ':hover': {
                                               textDecoration: 'underline'
                                            }
                                         }}
                                         variant="body2"
                                      >
                                         {order.users.fullname}
                                      </Typography>
                                   </Link>
                                </TableCell>
                                {/* <TableCell align="center">
                                   <Box
                                      sx={{
                                         display: 'flex',
                                         alignItems: 'end',
                                         gap: 1
                                      }}
                                   >
                                      {order.products.slice(0, 3).map(product => (
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
                                <TableCell align="center">${order.receipts.totalPrice.toFixed(2)}</TableCell>
                                <TableCell align="center">
                                   <SeverityPill
                                      color={
                                         {
                                          accept: '#2196f3',
                                          packaging: '#ffc400',
                                          shipping: '#00e5ff',
                                          receive: '#76ff03',
                                          done: '#f50057',
                                          cancel: '#d500f9'
                                         }[order.status || 'accept']
                                      }
                                   >
                                      {order.status}
                                   </SeverityPill>
                                </TableCell>
                                <TableCell align="center">
                                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <Link href={`/orders/${order.id}/edit`} passHref>
                                         <Tooltip title="Edit Order" placement="top">
                                            <IconButton size="small">
                                               <PencilIcon width={20} />
                                            </IconButton>
                                         </Tooltip>
                                      </Link>
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
                          ))
                        : Array.from(new Array(NUMBER_ORDERS)).map((item, idx) => (
                             <TableRow hover key={idx}>
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
                             </TableRow>
                          ))}
                  </TableBody>
               </Table>
            </Box>
         </PerfectScrollbar>
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'flex-end',
               p: 2
            }}
         >
            <NextLink href={'/orders'} passHref>
               <Button
                  color="primary"
                  endIcon={<ArrowRightIcon fontSize="small" />}
                  size="small"
                  variant="text"
               >
                  View all
               </Button>
            </NextLink>
         </Box>
      </Card>
   )
}

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import { Box, Button, Container, Grid, MenuItem, Skeleton, Typography } from '@mui/material'
import { ButtonDropdownMenu } from 'components/button-dropdown-menu'
import { DashboardLayout } from 'components/layouts'
import { OrderBasicInfoCard } from 'components/order/order-basic-info-card'
import { OrderLineItemsCard } from 'components/order/order-line-items-card'
import { format, parseISO } from 'date-fns'
import PencilIcon from 'icons/pencil'
import { Order, ResponseData } from 'models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { downloadFile } from 'utils'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useQuery, useMutation } from '@apollo/client'
import USERS_QUERY from 'graphql/query/users'
import moment from 'moment'
import ORDERS_QUERY from 'graphql/query/orders'
import UPDATE_ORDER from 'graphql/mutation/updateOrder'

export interface OrderDetailPageProps {}
function OrderDetailPage(props: OrderDetailPageProps) {
   const { enqueueSnackbar } = useSnackbar()
   const router = useRouter()
   const { orderId } = router.query

   const { data: _order } = useQuery(ORDERS_QUERY, { variables: { input: { ids: [orderId] }} })

   const [order, setOrder] = useState(new Order())
   const [updateOrder] = useMutation(UPDATE_ORDER)

   useEffect(() => {
      if(_order) {
         const _data = _order.orders
         setOrder(_data.items?.[0] || new Order())
      }
   }, [_order])

   const handleUpdateOrder = async (payload: Partial<Order>) => {
      if (typeof orderId === 'string') {
         try {
            let newOrder = await updateOrder({ variables: { input: payload } });
            console.log(newOrder);
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      }
   }
   const handleReorderOrder = async () => {
      await handleUpdateOrder({
         id: order.id,
         status: 'accept' 
      })
   }
   const handlePackagingOrder = async () => {
      await handleUpdateOrder({ 
         id: order.id,
         status: 'packaging' 
      })
   }
   const handleApproveOrder = async () => {
      await handleUpdateOrder({ 
         id: order.id,
         status: 'shipping' 
      })
   }
   const handleShippingOrder = async () => {
      await handleUpdateOrder({ 
         id: order.id,
         status: 'receive' 
      })
   }
   const handleCompleteOrder = async () => {
      await handleUpdateOrder({ 
         id: order.id,
         status: 'done' 
      })
   }
   const handleRejectOrder = async () => {
      await handleUpdateOrder({ 
         id: order.id,
         status: 'cancel' 
      })
   }

   const handleExportInvoice = async () => {
      if (typeof orderId === 'string') {
         try {
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      }
   }

   return (
      <>
         <Head>
            <title>Chi tiết đơn hàng | FurnitureStore Dashboard</title>
         </Head>
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               pt: 6,
               pb: 12,
               px: 6
            }}
         >
            <Container maxWidth={false}>
               <Box
                  sx={{
                     alignItems: 'center',
                     display: 'flex',
                     justifyContent: 'space-between',
                     flexWrap: 'wrap'
                  }}
               >
                  <Link href="/orders" passHref>
                     <Button variant="text" startIcon={<ArrowBackIcon />}>
                        Danh sách đơn hàng
                     </Button>
                  </Link>
               </Box>
               <Grid
                  container
                  sx={{
                     mt: 1,
                     alignItems: 'center',
                     justifyContent: 'space-between'
                  }}
               >
                  {order ? (
                     <Grid item sx={{ m: 1 }}>
                        <Typography variant="h4">#{order.id}</Typography>
                        <Typography
                           variant="body2"
                           color="textSecondary"
                           sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}
                        >
                           Ngày tạo
                           <EventAvailableRoundedIcon />
                           {moment(order.createdAt || undefined).format('DD/MM/YYYY HH:mm')}
                        </Typography>
                     </Grid>
                  ) : (
                     <Grid item>
                        <Typography sx={{ m: 1 }} variant="h4">
                           <Skeleton variant="text" width="300px" />
                        </Typography>
                        <Typography sx={{ m: 1 }} variant="body2" color="textSecondary">
                           <Skeleton variant="text" width="300px" />
                        </Typography>
                     </Grid>
                  )}
                  {order && (
                     <Grid item sx={{ display: 'flex', gap: 2 }}>
                        {/* <Link href={`/orders/${orderId}/edit`} passHref>
                           <Button variant="outlined" endIcon={<PencilIcon width={20} />}>
                              Chỉnh sửa
                           </Button>
                        </Link> */}
                        {order.status === 'accept' && (
                           <ButtonDropdownMenu label="Actions">
                              <MenuItem
                                 onClick={handlePackagingOrder}
                                 sx={{
                                    color: 'primary'
                                 }}
                              >
                                 Packaging
                              </MenuItem>
                              <MenuItem onClick={handleRejectOrder}>Reject</MenuItem>
                              <MenuItem onClick={handleExportInvoice}>Export Invoice</MenuItem>
                           </ButtonDropdownMenu>
                        )}
                        {order.status === 'packaging' && (
                           <ButtonDropdownMenu label="Actions">
                              <MenuItem
                                 onClick={handleApproveOrder}
                                 sx={{
                                    color: 'primary'
                                 }}
                              >
                                 Approve
                              </MenuItem>
                              <MenuItem onClick={handleRejectOrder}>Reject</MenuItem>
                              <MenuItem onClick={handleExportInvoice}>Export Invoice</MenuItem>
                           </ButtonDropdownMenu>
                        )}
                        {order.status === 'shipping' && (
                           <ButtonDropdownMenu label="Actions">
                              <MenuItem
                                 onClick={handleShippingOrder}
                                 sx={{
                                    color: 'primary'
                                 }}
                              >
                                 Shipping
                              </MenuItem>
                              <MenuItem onClick={handleRejectOrder}>Reject</MenuItem>
                              <MenuItem onClick={handleExportInvoice}>Export Invoice</MenuItem>
                           </ButtonDropdownMenu>
                        )}
                        {order.status === 'receive' && (
                           <ButtonDropdownMenu label="Actions">
                              <MenuItem
                                 onClick={handleCompleteOrder}
                                 sx={{
                                    color: 'primary'
                                 }}
                              >
                                 Received
                              </MenuItem>
                              <MenuItem onClick={handleRejectOrder}>Reject</MenuItem>
                              <MenuItem onClick={handleExportInvoice}>Export Invoice</MenuItem>
                           </ButtonDropdownMenu>
                        )}
                        {order.status === 'done' && (
                           <ButtonDropdownMenu label="Actions">
                              <MenuItem
                                 onClick={handleShippingOrder}
                                 sx={{
                                    color: 'primary'
                                 }}
                              >
                                 Re Shipping
                              </MenuItem>
                              <MenuItem onClick={handleExportInvoice}>Export Invoice</MenuItem>
                           </ButtonDropdownMenu>
                        )}
                        {order.status === 'cancel' && (
                           <ButtonDropdownMenu label="Actions">
                              <MenuItem
                                 onClick={handleReorderOrder}
                                 sx={{
                                    color: 'primary'
                                 }}
                              >
                                 Reorder
                              </MenuItem>
                           </ButtonDropdownMenu>
                        )}
                     </Grid>
                  )}
               </Grid>
               <Box sx={{ ml: 1, mt: 4 }}>
                  <OrderBasicInfoCard order={order} />
               </Box>
               <Box sx={{ ml: 1, mt: 4 }}>
                  <OrderLineItemsCard order={order} />
               </Box>
            </Container>
         </Box>
      </>
   )
}

OrderDetailPage.Layout = DashboardLayout
export default OrderDetailPage

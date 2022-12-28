import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import { Box, Button, Container, Grid, Skeleton, Typography } from '@mui/material'
import { DashboardLayout } from 'components/layouts'
import { OrderBasicInfoCard } from 'components/order/order-basic-info-card'
import { OrderLineItemsCard } from 'components/order/order-line-items-card'
import { Order, OrderPayload } from 'models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useMutation, useQuery } from '@apollo/client'
import CANCEL_ORDER from 'graphql/mutation/cancelOrder'
import moment from 'moment'
import ORDERS_QUERY from 'graphql/query/orders'
import UPDATE_ORDER from 'graphql/mutation/updateOrder'

export interface OrderDetailPageProps { }
function OrderDetailPage(props: OrderDetailPageProps) {
   const { enqueueSnackbar } = useSnackbar()
   const router = useRouter()
   const { orderId } = router.query

   const { data: _order, refetch } = useQuery(ORDERS_QUERY, { variables: { input: { ids: [orderId] } } })
   const [cancelOrder] = useMutation(CANCEL_ORDER)
   const [updateOrder] = useMutation(UPDATE_ORDER)

   const [order, setOrder] = useState(new Order())

   useEffect(() => {
      if (_order) {
         const _data = _order.orders
         setOrder(_data.items?.[0] || new Order())
      }
   }, [_order])

   const handleUpdateOrder = async (payload: OrderPayload) => {
      if (typeof orderId === 'string') {
         try {
            updateOrder({ variables: { input: payload } })
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      }
   }


   const handleCancelOrder = (id: string) => {
      if (id) {
         cancelOrder({ variables: { input: { id } } }).then((res) => {
            enqueueSnackbar("Hủy đơn hàng thành công", { variant: "success" })
            refetch()
         })
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
               </Grid>
               <Box sx={{ ml: 1, mt: 4 }}>
                  <OrderBasicInfoCard order={order} cancelOrder={handleCancelOrder} updateOrder={handleUpdateOrder}/>
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

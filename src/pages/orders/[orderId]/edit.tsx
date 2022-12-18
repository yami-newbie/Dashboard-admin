import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import { Box, Button, Container, Grid, Skeleton, Typography } from '@mui/material'
import { DashboardLayout } from 'components/layouts'
import { OrderBasicInfoCardEdit } from 'components/order/order-basic-info-card-edit'
import { format, parseISO } from 'date-fns'
import { Order, ResponseData } from 'models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useQuery } from '@apollo/client'
import USERS_QUERY from 'graphql/query/users'

export interface EditOrderPageProps {}

const EditOrderPage = (props: EditOrderPageProps) => {
   const { enqueueSnackbar } = useSnackbar()
   const router = useRouter()
   const { orderId } = router.query
   const { data: order } = useQuery(USERS_QUERY)

   const handleUpdateBasicInfo = async (payload: Partial<Order>) => {
      if (typeof orderId === 'string') {
         try {
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      }
   }
   const handleDeleteOrder = async () => {
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
            <title>Login | FurnitureStore Dashboard</title>
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
                        Orders
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
                        <Typography variant="h4">#{order._id}</Typography>
                        <Typography
                           variant="body2"
                           color="textSecondary"
                           sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}
                        >
                           Placed on
                           <EventAvailableRoundedIcon />
                           {format(parseISO(order.createdAt), 'dd/MM/yyyy HH:mm')}
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
                  <Grid item sx={{ display: 'flex', gap: 2 }}></Grid>
               </Grid>

               <Box sx={{ ml: 1, mt: 4 }}>
                  <OrderBasicInfoCardEdit
                     order={order}
                     onSave={handleUpdateBasicInfo}
                     onDelete={handleDeleteOrder}
                  />
               </Box>
            </Container>
         </Box>
      </>
   )
}

EditOrderPage.Layout = DashboardLayout

export default EditOrderPage

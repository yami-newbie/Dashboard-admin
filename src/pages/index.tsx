import { useQuery } from '@apollo/client'
import { Box, Container, Grid } from '@mui/material'
import { DashboardCards, LatestOrders, LatestProducts, Sales } from 'components/dashboard'
import { DashboardLayout } from 'components/layouts'
import STATISTIC_QUERY from 'graphql/query/statistic'
import { Order, ProductType } from 'models'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { SortEnum } from '../constants/enums/sort-enum'

const Dashboard = () => {
   const { data, refetch, loading } = useQuery(STATISTIC_QUERY, {
      variables: Object.assign({ order: { createdAt: SortEnum.DESC } })
   })
   const [products, setProducts] = useState<ProductType[]>([])
   const [orders, setOrders] = useState<Order[]>([])

   const [customerViewData, setCustomerViewData] = useState({
         label: "",
         value: 0,
         compareLastMonth: 0,
   })
   const [orderViewData, setOrderViewData] = useState({
      label: "",
      value: 0,
      compareLastMonth: 0,
   })
   const [profitViewData, setProfitViewData] = useState({
      label: "",
      value: 0,
      compareLastMonth: 0,
   })

   useEffect(() => {
      if (data) {
         console.log(data)
         setCustomerViewData({
            label: "Customers",
            value: data.users.totalCount,
            compareLastMonth: 10,
         })
         setOrderViewData({
            label: "Orders",
            value: data.orders.totalCount,
            compareLastMonth: -20,
         })
         setProducts(data.productTypes.items)
         setOrders(data.orders.items)
      }
   }, [data])
   return (
      <>
         <Head>
            <title>Dashboard | Cheems Store</title>
         </Head>
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               py: 8
            }}
         >
            <Container maxWidth={false}>
               <Grid container spacing={3}>
                  <DashboardCards customer={customerViewData} order={orderViewData} profit={profitViewData}/>
                  <Grid item lg={4} md={6} xl={3} xs={12}>
                     <LatestProducts products={products} sx={{ height: '100%' }} />
                  </Grid>
                  <Grid item lg={8} md={12} xl={12} xs={12}>
                     <LatestOrders orders={orders} />
                  </Grid>
               </Grid>
            </Container>
         </Box>
      </>
   )
}

Dashboard.Layout = DashboardLayout

export default Dashboard

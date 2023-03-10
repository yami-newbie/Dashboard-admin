import { useMutation, useQuery } from '@apollo/client'
import {
   Box,
   Card,
   Container,
   Divider,
   Tab,
   TablePagination,
   Tabs,
   Typography
} from '@mui/material'
import { DashboardLayout } from 'components/layouts'
import { OrderListResults } from 'components/order/order-list-results'
import DELETE_ORDER from 'graphql/mutation/deleteOrder'
import ORDERS_QUERY from 'graphql/query/orders'
import { DEFAULT_PAGINATION, Order, OrderStatus, PaginationParams } from 'models'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

const Orders = () => {
   const { enqueueSnackbar } = useSnackbar()
   const [filters, setFilters] = useState<{ status: null | string }>({ status: null })
   const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION)
   const [orderList, setOrderList] = useState<Order[]>([])
   const [deleteOrder] = useMutation(DELETE_ORDER)

   const { data: _orderList } = useQuery(ORDERS_QUERY, { variables: { input: { ...filters, isDeleted: false } } })

   useEffect(() => {
      if (_orderList) {
         const _data = _orderList.orders

         setOrderList(_data.items || [])
      }
   }, [_orderList])

   const handleLimitChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setPagination({ ...pagination, pageSize: Number.parseInt(event.target.value) })
   }

   const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPagination({ ...pagination, currentPage: newPage + 1 })
   }

   const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
      setPagination(DEFAULT_PAGINATION)
      if (newValue !== "") setFilters({
         ...filters,
         status: newValue
      })
      else setFilters({
         ...filters,
         status: null
      })
   }

   const handleDeleteOrder = (id: string) => {
      if (id) {
         deleteOrder({ variables: { input: { id } } }).then((res) => {
            enqueueSnackbar("X??a ????n h??ng th??nh c??ng", { variant: "success" })
         })
      }
   }

   

   return (
      <>
         <Head>
            <title>Orders | Cheems Store</title>
         </Head>
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               py: 8
            }}
         >
            <Container maxWidth={false}>
               <Box
                  sx={{
                     alignItems: 'center',
                     display: 'flex',
                     justifyContent: 'space-between',
                     flexWrap: 'wrap',
                     m: -1
                  }}
               >
                  <Typography sx={{ m: 1 }} variant="h4">
                     Danh s??ch ????n h??ng
                  </Typography>
               </Box>
               <Box sx={{ mt: 1 }}>
                  <Card>
                     <Tabs value={filters.status} onChange={handleChangeTab}>
                        <Tab label="T???t c???" value={null} />
                        {
                           Object.keys(OrderStatus).map((item, index) => <Tab key={index} {...OrderStatus[item]}/> )
                        }
                        {/* <Tab label="??ang ch??? x??? l??" value="PENDING" />
                        <Tab label="??ang x??? l??" value="PROCESSING" />
                        <Tab label="???? giao h??ng" value="DELIVERIED" />
                        <Tab label="???? h???y" value="CANCELED" /> */}
                     </Tabs>
                     <Divider />

                     <PerfectScrollbar>
                        <Box sx={{ width: '100%' }}>
                           <OrderListResults
                              orderList={orderList}
                              onDeleteOrder={handleDeleteOrder}
                           />
                        </Box>
                     </PerfectScrollbar>
                     <Divider />
                     
                     <TablePagination
                        component="div"
                        labelRowsPerPage="S??? h??ng m???i trang"
                        labelDisplayedRows={({ from, to, count }) => {
                           return `${from}???${to} tr??n ${count !== -1 ? count : `nhi???u h??n ${to}`}`;
                        }}
                        count={pagination.totalCount}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={pagination.currentPage}
                        rowsPerPage={pagination.pageSize}
                        rowsPerPageOptions={[5, 10, 25]}
                     />
                  </Card>
               </Box>
            </Container>
         </Box>
      </>
   )
}
Orders.Layout = DashboardLayout

export default Orders

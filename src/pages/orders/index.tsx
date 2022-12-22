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
import { OrderDetailModal } from 'components/order/order-detail'
import { OrderListResults } from 'components/order/order-list-results'
import DELETE_ORDER from 'graphql/mutation/deleteOrder'
import ORDERS_QUERY from 'graphql/query/orders'
import { DEFAULT_PAGINATION, ManufactureInfo, Manufacturer, Order, PaginationParams, Payment, Product, ProductType, Receipt, ReceiptDetail, User } from 'models'
import Head from 'next/head'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

export const testOrder = new Order(
   "id",
   "id",
   new Receipt(
      "id",
      123123,
      10,
      "id",
      new Payment(
         "id",
         "id"
      ),
      "dasd",
      [
         new ReceiptDetail("id", "id", 1, "id", 3000, new Product("id", "id", new ManufactureInfo("id", "", "", "", "", new Manufacturer()), "", "", "id", new ProductType("id", "name", "desc", 12039, [], 2, [], "", "", "", []))),
         new ReceiptDetail("id", "id", 3, "id", 3400),
         new ReceiptDetail("id", "id", 2, "id", 3030),
         new ReceiptDetail("id", "id", 4, "id", 5000),
         new ReceiptDetail("id", "id", 1, "id", 78700)
      ]
   ),
   "PENDING",
   "id",
   new User(
      "id",
      "name"
   ),
   "from",
   "to",
   false)

const Orders = () => {
   const [filters, setFilters] = useState({ status: '' })
   const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION)
   const [orderList, setOrderList] = useState<Order[]>(Array(10).fill(testOrder))
   const [deleteOrder] = useMutation(DELETE_ORDER)

   const { data: _orderList } = useQuery(ORDERS_QUERY, { variables: { input: filters } })

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
      setFilters({
         ...filters,
         status: newValue
      })
   }

   const handleDeleteOrder = (id: string) => {
      if (id) {
         deleteOrder({ variables: { input: { id } } })
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
                     Danh sách đơn hàng
                  </Typography>
               </Box>
               <Box sx={{ mt: 1 }}>
                  <Card>
                     <Tabs value={filters.status} onChange={handleChangeTab}>
                        <Tab label="Tất cả" value="" />
                        <Tab label="Đang chờ xử lý" value="PENDING" />
                        <Tab label="Đang xử lý" value="PROCESSING" />
                        <Tab label="Đã giao hàng" value="DELIVERIED" />
                        <Tab label="Đã hủy" value="CANCELED" />
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
                     <TablePagination
                        component="div"
                        count={pagination.totalCount}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={pagination.currentPage - 1}
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

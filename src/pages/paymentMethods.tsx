import {
   Box,
   Button,
   Card,
   CardContent,
   Container,
   Divider,
   Stack,
   Typography
} from '@mui/material'
import { DashboardLayout } from 'components/layouts'
import Head from 'next/head'
import CustomTable from 'components/custom/table'
import { useQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import {
   PaymentMethod,
   PaymentMethodPayLoad,
   DEFAULT_PAGINATION,
   PageInfo,
   PaginationParams,
   Variables_Graphql
} from 'models'
import { useSnackbar } from 'notistack'
import CREATE_PAYMENT_METHOD from 'graphql/mutation/createPaymentMethod'
import UPDATE_PAYMENT_METHOD from 'graphql/mutation/updatePaymentMethod'
import DELETE_PAYMENT_METHOD from 'graphql/mutation/deletePaymentMethod'
import PAYMENT_METHODS_QUERY from 'graphql/query/paymentMethods'
import PaymentMethodCreateEditModal from 'components/paymentMethod/modal'

interface PaymentMethodsDataTable {
   name: string
   currency: string
   _data: PaymentMethod
}

const PaymentMethods = () => {
   const { enqueueSnackbar } = useSnackbar()
   const [rows, setRows] = useState<PaymentMethodsDataTable[]>([])

   const [dataPaymentMethodModal, setDataPaymentMethodModal] = useState<PaymentMethod | undefined>()
   const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false)

   const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION)
   const [rowsPerPage, setRowsPerPage] = useState(5)
   const [paginationQuery, setPaginationQuery] = useState<Variables_Graphql>({ take: rowsPerPage })
   const [pageInfo, setPageInfo] = useState<PageInfo>()

   const { data, refetch, loading } = useQuery(PAYMENT_METHODS_QUERY, {
      variables: { ...paginationQuery }
   })

   const [createPaymentMethod] = useMutation(CREATE_PAYMENT_METHOD)
   const [updatePaymentMethod] = useMutation(UPDATE_PAYMENT_METHOD)
   const [removePaymentMethod] = useMutation(DELETE_PAYMENT_METHOD)

   const headers = [
      { field: 'name', headerName: 'Name' },
      // { field: 'address', headerName: 'Address' },
      { field: 'currency', headerName: 'Currency' }
   ]

   useEffect(() => {
      if (paginationQuery) {
         refetch(paginationQuery)
      }
   }, [paginationQuery, refetch])

   useEffect(() => {
      if (data) {
         console.log(data)

         const _data = data.paymentMethods

         const nodes_data = _data.items as Array<PaymentMethod>

         // setPaymentMethods(nodes_data)

         setPageInfo(_data.pageInfo)

         setPagination(prev => ({
            ...prev,
            totalCount: _data.totalCount
         }))

         setRows(
            nodes_data.map(
               (item, index) =>
                  ({
                     name: item.name,
                     currency: item.currency,
                     _data: item
                  } as PaymentMethodsDataTable)
            )
         )
      }
   }, [data])

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const value = parseInt(event.target.value)
      setRowsPerPage(value)
      setPagination(prev => ({
         ...prev,
         currentPage: 0
      }))
   }

   const handleChangePagination = (
      event: any,
      value: number
   ) => {
      console.log(value)

      setPaginationQuery({
         skip: (value - 1) * rowsPerPage,
         take: rowsPerPage         
      })
      setPagination(prev => ({
         ...prev,
         currentPage: value
      }))
   }

   const handlePaymentMethodModalOpen = (data?: PaymentMethod) => {
      console.log(data)

      setDataPaymentMethodModal(data)
      setIsPaymentMethodModalOpen(true)
   }

   const handleClosePaymentMethodModal = () => {
      setDataPaymentMethodModal(new PaymentMethod())
      setIsPaymentMethodModalOpen(false)
   }

   const onHandleDeletePaymentMethod = async (id: string) => {
      try {
         await removePaymentMethod({ variables: { input: { id } } })

         refetch()

         enqueueSnackbar('Success', { variant: 'success' })
      } catch (e: any) {
         enqueueSnackbar(e.message, { variant: 'error' })
      }
   }

   const onHandleCreateEditPaymentMethod = async (data: PaymentMethodPayLoad) => {
      try {
         if (data && data.id) {
            await updatePaymentMethod({ variables: { input: data } })

            refetch()

            enqueueSnackbar('Success', { variant: 'success' })
         } else {
            await createPaymentMethod({ variables: { input: data } })

            refetch()

            enqueueSnackbar('Success', { variant: 'success' })
         }
         handleClosePaymentMethodModal()
      } catch (e: any) {
         enqueueSnackbar(e.message, { variant: 'error' })
      }
   }

   return (
      <>
         <Head>
            <title>PaymentMethods | Cheems Store</title>
         </Head>
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               py: 8
            }}
         >
            <Container maxWidth="lg">
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
                  Danh sách phương thức thanh toán
                  </Typography>
                  <Box sx={{ m: 1 }}>
                     <Stack direction="row" spacing={2}>
                        <Button
                           color="primary"
                           variant="contained"
                           onClick={() => {
                              setDataPaymentMethodModal(undefined)
                              setIsPaymentMethodModalOpen(true)
                           }}
                        >
                           Thêm phương thức thanh toán
                        </Button>
                     </Stack>
                  </Box>
               </Box>
               <Divider sx={{ my: 2 }} />
               <Card>
                  <CardContent>
                     <CustomTable
                        headers={headers}
                        rows={rows}
                        loading={loading}
                        rowsPerPage={rowsPerPage}
                        onHandleEditButton={handlePaymentMethodModalOpen}
                        onHandleDeleteButton={onHandleDeletePaymentMethod}
                        handleChangePage={handleChangePagination}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        page={pagination.currentPage}
                        totalItems={pagination.totalCount}
                        subButton={false}
                     />
                  </CardContent>
               </Card>
            </Container>
            <PaymentMethodCreateEditModal
               data={dataPaymentMethodModal}
               isOpen={isPaymentMethodModalOpen}
               onSubmit={onHandleCreateEditPaymentMethod}
               onClose={handleClosePaymentMethodModal}
            />
         </Box>
      </>
   )
}

PaymentMethods.Layout = DashboardLayout

export default PaymentMethods

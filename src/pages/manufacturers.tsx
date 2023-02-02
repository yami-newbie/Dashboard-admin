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
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import MANUFACTURERS_QUERY from 'graphql/query/manufacturers'
import { useEffect, useState } from 'react'
import {
   ManufactureInfo,
   ManufactureInfoPayLoad,
   Manufacturer,
   ManufacturerPayLoad
} from 'models/manufacturer'
import { DEFAULT_PAGINATION, Media, PageInfo, PaginationParams, Variables_Graphql } from 'models'
import ManufacturerCreateEditModal from 'components/manufacturer/modal-manufacturer'
import CREATE_MANUFACTURER from 'graphql/mutation/createManufacturer'
import UPDATE_MANUFACTURER from 'graphql/mutation/updateManufacturer'
import { useSnackbar } from 'notistack'
import DELETE_MANUFACTURER from 'graphql/mutation/deleteManufacturer'
import ManufacturerInfoCreateEditModal from 'components/manufacturer/modal-manufacturer-info'
import CREATE_MANUFACTURE_INFO from 'graphql/mutation/createManufactureInfo'

interface ManufacturersDataTable {
   name: string
   address: string
   description: string
   _data: Manufacturer
}

const Manufacturers = () => {
   const { enqueueSnackbar } = useSnackbar()
   const [rows, setRows] = useState<ManufacturersDataTable[]>([])

   const [dataManufactureModal, setDataManufactureModal] = useState<Manufacturer | undefined>()
   const [dataManufactureInfoModal, setDataManufactureInfoModal] = useState<
      ManufactureInfo | undefined
   >()
   const [isManufactureModalOpen, setIsManufactureModalOpen] = useState(false)
   const [isManufactureInfoModalOpen, setIsManufactureInfoModalOpen] = useState(false)

   const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION)
   const [rowsPerPage, setRowsPerPage] = useState(5)
   const [paginationQuery, setPaginationQuery] = useState<Variables_Graphql>({ take: rowsPerPage })
   const [pageInfo, setPageInfo] = useState<PageInfo>()

   const { data, refetch, loading, error } = useQuery(MANUFACTURERS_QUERY, {
      variables: Object.assign({ ...paginationQuery }, { input: { isDeleted: false } })
   })
   const [createManufacturer] = useMutation(CREATE_MANUFACTURER)
   const [updateManufacturer] = useMutation(UPDATE_MANUFACTURER)
   const [removeManufacturer] = useMutation(DELETE_MANUFACTURER)

   const [createManufacturerInfo] = useMutation(CREATE_MANUFACTURE_INFO)

   const headers = [
      { field: 'name', headerName: 'Tên hãng' },
      { field: 'address', headerName: 'Địa chỉ' },
      { field: 'description', headerName: 'Miêu tả' }
   ]

   useEffect(() => {
      if (paginationQuery) {
         refetch(Object.assign({ ...paginationQuery }, { input: { isDeleted: false } }))
      }
   }, [paginationQuery, refetch])

   useEffect(() => {
      if (data) {

         const _data = data.manufacturers

         const nodes_data = _data.items as Array<Manufacturer>

         // setManufacturers(nodes_data)

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
                     address: item.address,
                     description: item.description,
                     _data: item
                  } as ManufacturersDataTable)
            )
         )
      }
   }, [data])

   useEffect(() => {
      if(error) {
         enqueueSnackbar("Có lỗi xảy ra khi tải danh sách nhà sản xuất", { variant: 'error' })
      }
   }, [error, enqueueSnackbar])
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

      setPaginationQuery({
         skip: (value - 1) * rowsPerPage,
         take: rowsPerPage         
      })

      setPagination(prev => ({
         ...prev,
         currentPage: value
      }))
   }

   const handleManufactureModalOpen = (data?: Manufacturer) => {
      console.log(data)

      setDataManufactureModal(data)
      setIsManufactureModalOpen(true)
   }

   const handleManufactureInfoModalOpen = (data?: string) => {
      const newInfo = new ManufactureInfo()
      newInfo.manufacturersId = data || ''

      setDataManufactureInfoModal(newInfo)
      setIsManufactureInfoModalOpen(true)
   }

   const handleCloseManufactureModal = () => {
      setIsManufactureModalOpen(false)
      setDataManufactureModal(undefined)
   }

   const handleCloseManufactureInfoModal = () => {
      setIsManufactureInfoModalOpen(false)
      setDataManufactureInfoModal(undefined)
   }

   const onHandleDeleteManufacture = async (id: string) => {
      await removeManufacturer({ variables: { input: { id } } })

      refetch()

      enqueueSnackbar('Success', { variant: 'success' })
   }

   const onHandleCreateEditManufacture = async (data: ManufacturerPayLoad) => {
      if (data && data.id) {
         await updateManufacturer({ variables: { input: data } })

         refetch()

         enqueueSnackbar('Success', { variant: 'success' })
      } else {
         await createManufacturer({ variables: { input: data} })

         refetch()

         enqueueSnackbar('Success', { variant: 'success' })
      }
      handleCloseManufactureModal()
   }

   const onHandleCreateEditManufactureInfo = async (data: ManufactureInfoPayLoad) => {
         if (data && data.id) {
            // await update({ variables: { input: data } })

            // refetch()

            enqueueSnackbar('Success', { variant: 'success' })
         } else {
            await createManufacturerInfo({ variables: { input: data } })

            // refetch()

            enqueueSnackbar('Success', { variant: 'success' })
         }
         handleCloseManufactureInfoModal()
   }

   return (
      <>
         <Head>
            <title>Manufacturers | Cheems Store</title>
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
                     Danh sách nhà sản xuất
                  </Typography>
                  <Box sx={{ m: 1 }}>
                     <Stack direction="row" spacing={2}>
                        <Button
                           color="primary"
                           variant="contained"
                           onClick={() => {
                              setDataManufactureModal(undefined)
                              setIsManufactureModalOpen(true)
                           }}
                        >
                           Thêm nhà sản xuất
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
                        rowsPerPage={rowsPerPage}
                        loading={loading}
                        onHandleEditButton={handleManufactureModalOpen}
                        onHandleDeleteButton={onHandleDeleteManufacture}
                        onHandleSubButton={handleManufactureInfoModalOpen}
                        handleChangePage={handleChangePagination}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        page={pagination.currentPage}
                        totalItems={pagination.totalCount}
                        subButton
                     />
                  </CardContent>
               </Card>
            </Container>
            <ManufacturerCreateEditModal
               data={dataManufactureModal}
               isOpen={isManufactureModalOpen}
               onSubmit={onHandleCreateEditManufacture}
               onClose={handleCloseManufactureModal}
            />
            <ManufacturerInfoCreateEditModal
               data={dataManufactureInfoModal}
               isOpen={isManufactureInfoModalOpen}
               onSubmit={onHandleCreateEditManufactureInfo}
               onClose={handleCloseManufactureInfoModal}
            />
         </Box>
      </>
   )
}

Manufacturers.Layout = DashboardLayout

export default Manufacturers

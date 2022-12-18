import { Avatar, Box, Button, Card, CardContent, CardHeader, Container, Divider, Stack, Typography } from '@mui/material'
import { DashboardLayout } from 'components/layouts'
import Head from 'next/head'
import CustomTable from 'components/custom/table'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import MANUFACTURERS_QUERY from 'graphql/query/manufacturers'
import { useEffect, useState } from 'react'
import { ManufactureInfo, ManufactureInfoPayLoad, Manufacturer, ManufacturerPayLoad } from 'models/manufacturer'
import { useRouter } from 'next/router'
import { DEFAULT_PAGINATION, PageInfo, PaginationParams, Variables_Graphql } from 'models'
import { ProductTypesFilterInput } from 'graphql/query/productTypes'
import ManufacturerCreateEditModal from 'components/manufacturer/modal-manufacturer'
import CREATE_MANUFACTURER from 'graphql/mutation/createManufacturer'
import UPDATE_MANUFACTURER from 'graphql/mutation/updateManufacturer'
import { useSnackbar } from 'notistack'
import DELETE_MANUFACTURER from 'graphql/mutation/deleteManufacturer'
import { ConfirmDialog } from 'components/productType/confirm-dialog'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import ManufacturerInfoCreateEditModal from 'components/manufacturer/modal-manufacturer-info'
import CREATE_MANUFACTURE_INFO from 'graphql/mutation/createManufactureInfo'

interface ManufacturersDataTable {
   name: string,
   address: string,
   description: string,
   _data: Manufacturer
}

const Manufacturers = () => {
   const { enqueueSnackbar } = useSnackbar()
   const [rows, setRows] = useState<ManufacturersDataTable[]>([])
   
   const [dataManufactureModal, setDataManufactureModal] = useState<Manufacturer | undefined>()
   const [dataManufactureInfoModal, setDataManufactureInfoModal] = useState<ManufactureInfo | undefined>()
   const [isManufactureModalOpen, setIsManufactureModalOpen] = useState(false)
   const [isManufactureInfoModalOpen, setIsManufactureInfoModalOpen] = useState(false)

   const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION)
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [paginationQuery, setPaginationQuery] = useState<Variables_Graphql>({ first: rowsPerPage })
   const [pageInfo, setPageInfo] = useState<PageInfo>()

   const [fetch, { data, refetch }] = useLazyQuery(MANUFACTURERS_QUERY, { variables: { ...paginationQuery } })
   const [createManufacturer] = useMutation(CREATE_MANUFACTURER)
   const [updateManufacturer] = useMutation(UPDATE_MANUFACTURER)
   const [removeManufacturer] = useMutation(DELETE_MANUFACTURER)
   
   const [createManufacturerInfo] = useMutation(CREATE_MANUFACTURE_INFO)

   const headers = [{ field: 'name', headerName: 'Name' }, { field: 'address', headerName: 'Address' }, { field: 'description', headerName: 'Description' }]

   useEffect(() => {
      fetch()
   }, [])

   useEffect(() => {
      if(paginationQuery) {
         refetch(paginationQuery)
      }
   }, [paginationQuery])

   useEffect(() => {
      if (data) {
         console.log(data);
         
         const _data = data.manufacturers

         const nodes_data = _data.nodes as Array<Manufacturer>

         // setManufacturers(nodes_data)

         setPageInfo(_data.pageInfo)

         setPagination(prev => ({
            ...prev,
            totalItems: _data.totalCount
         }))

         setRows(nodes_data.map((item, index) => ({ name: item.name, address: item.address, description: item.description, _data: item }) as ManufacturersDataTable))
      }
   }, [data])

   useEffect(() => {
      if(pagination) {
         if(pagination.currentPage === 0) {
            setPaginationQuery(prev => ({...prev, after: null, first: rowsPerPage}))
         }
      }
   }, [pagination, rowsPerPage])

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => {
      const value = parseInt(event.target.value)
      setRowsPerPage(value);
      setPagination(prev => ({
         ...prev,
         currentPage: 0
      }))
   };

   const handleChangePagination = (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
      console.log(value);
      
      const currentPage = pagination.currentPage

      if (value === 0) {
         setPaginationQuery(prev =>({
            ...prev,
            after: null,
         }))
      }
      else {
         if (value > currentPage) {
            setPaginationQuery(prev => ({
               ...prev,
               after: pageInfo?.endCursor || null,
            }))
         }
         else {
            setPaginationQuery(prev => ({
               ...prev,
               after: pageInfo?.startCursor || null,
            }))
         }
      }
      setPagination(prev => ({
         ...prev,
         currentPage: value
      }))
   }

   const handleManufactureModalOpen = (data?: Manufacturer) => {
      console.log(data);
      
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
   }

   const handleCloseManufactureInfoModal = () => {
      setIsManufactureInfoModalOpen(false)
   }

   const onHandleDeleteManufacture = async (id: string) => {
      try {
         await removeManufacturer({ variables: { input: { id } } })

         refetch()

         enqueueSnackbar("Success", { variant: "success" })
      }
      catch(e: any){
         enqueueSnackbar(e.message, { variant: "error" })
      }
   }

   const onHandleCreateEditManufacture = async (data: ManufacturerPayLoad, files: File[]) => {
      try {
         if(data && data.id) {
            await updateManufacturer({ variables: { input: data, files } })

            refetch()

            enqueueSnackbar("Success", { variant: "success" })
         }
         else {
            await createManufacturer({ variables: { input: data } })
            
            refetch()

            enqueueSnackbar("Success", { variant: "success" })
         }
         handleCloseManufactureModal()
      }
      catch(e: any){
         enqueueSnackbar(e.message, { variant: "error" })
      }
   }

   const onHandleCreateEditManufactureInfo = async (data: ManufactureInfoPayLoad) => {
      try {
         if(data && data.id) {
            // await update({ variables: { input: data } })

            // refetch()

            enqueueSnackbar("Success", { variant: "success" })
         }
         else {
            await createManufacturerInfo({ variables: { input: data } })
            
            // refetch()

            enqueueSnackbar("Success", { variant: "success" })
         }
         handleCloseManufactureInfoModal()
      }
      catch(e: any){
         enqueueSnackbar(e.message, { variant: "error" })
      }
   }

   return (
      <>
         <Head>
            <title>Manufacturers | FurnitureStore Dashboard</title>
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
                     Manufacturers List
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
                           Add Manufacture
                        </Button>
                        <Button
                           color="primary"
                           variant="contained"
                           onClick={() => {
                              setDataManufactureInfoModal(undefined)
                              setIsManufactureInfoModalOpen(true)
                           }}
                        >
                           Add Manufacture Info
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
                        onHandleEditButton={handleManufactureModalOpen}
                        onHandleDeleteButton={onHandleDeleteManufacture}
                        onHandleSubButton={handleManufactureInfoModalOpen}
                        handleChangePage={handleChangePagination}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        page={pagination.currentPage}
                        totalItems={pagination.totalItems}
                        subButton
                     />
                  </CardContent>
               </Card>
            </Container>
            <ManufacturerCreateEditModal data={dataManufactureModal} isOpen={isManufactureModalOpen} onSubmit={onHandleCreateEditManufacture} onClose={handleCloseManufactureModal} />
            <ManufacturerInfoCreateEditModal data={dataManufactureInfoModal} isOpen={isManufactureInfoModalOpen} onSubmit={onHandleCreateEditManufactureInfo} onClose={handleCloseManufactureInfoModal} />
         </Box>
      </>
   )
}

Manufacturers.Layout = DashboardLayout

export default Manufacturers

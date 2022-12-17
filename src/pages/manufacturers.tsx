import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Typography } from '@mui/material'
import { DashboardLayout } from 'components/layouts'
import Head from 'next/head'
import CustomTable from 'components/custom/table'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import MANUFACTURERS_QUERY from 'graphql/query/manufacturers'
import { useEffect, useState } from 'react'
import { Manufacturer, ManufacturerPayLoad } from 'models/manufacturer'
import { useRouter } from 'next/router'
import { DEFAULT_PAGINATION, PageInfo, PaginationParams, Variables_Graphql } from 'models'
import { ProductTypesFilterInput } from 'graphql/query/productTypes'
import ManufacturerCreateEditModal from 'components/manufacturer/modal'
import CREATE_MANUFACTURER from 'graphql/mutation/createManufacturer'
import UPDATE_MANUFACTURER from 'graphql/mutation/updateManufacturer'
import { useSnackbar } from 'notistack'
import DELETE_MANUFACTURER from 'graphql/mutation/deleteManufacturer'

interface ManufacturersDataTable {
   name: string,
   address: string,
   description: string,
   _data: Manufacturer
}

const Manufacturers = () => {
   const { enqueueSnackbar } = useSnackbar()
   const [rows, setRows] = useState<ManufacturersDataTable[]>([])
   
   const [dataModal, setDataModal] = useState<Manufacturer | undefined>()
   const [isOpen, setIsOpen] = useState(false)

   const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION)
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [paginationQuery, setPaginationQuery] = useState<Variables_Graphql>({ first: rowsPerPage })
   const [pageInfo, setPageInfo] = useState<PageInfo>()

   const [fetch, { data, refetch }] = useLazyQuery(MANUFACTURERS_QUERY, { variables: { ...paginationQuery } })
   const [create] = useMutation(CREATE_MANUFACTURER)
   const [update] = useMutation(UPDATE_MANUFACTURER)
   const [remove] = useMutation(DELETE_MANUFACTURER)

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

   const handleOpenModal = (data?: Manufacturer) => {
      console.log(data);
      
      setDataModal(data)
      setIsOpen(true)
   }

   const handleCloseModal = () => {
      setIsOpen(false)
   }

   const onHandleDelete = async (id: string) => {
      try {
         await remove({ variables: { input: { id } } })

         refetch()

         enqueueSnackbar("Success Add Manufacturer", { variant: "success" })
      }
      catch(e: any){
         enqueueSnackbar(e.message, { variant: "error" })
      }
   }

   const onHandleCreateEdit = async (data: ManufacturerPayLoad, files: File[]) => {
      try {
         if(data && data.id) {
            await update({ variables: { input: data, files } })

            refetch()

            enqueueSnackbar("Success Add Manufacturer", { variant: "success" })
         }
         else {
            await create({ variables: { input: data } })
            
            refetch()

            enqueueSnackbar("Success Add Manufacturer", { variant: "success" })
         }
         handleCloseModal()
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
                     <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                           setDataModal(undefined)
                           setIsOpen(true)
                        }}
                     >
                        Add Manufacture
                     </Button>
                  </Box>
               </Box>
               <Divider sx={{ my: 2 }} />
               <Card>
                  <CardContent>
                     <CustomTable
                        headers={headers}
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        onHandleEditButton={handleOpenModal}
                        onHandleDeleteButton={onHandleDelete}
                        handleChangePage={handleChangePagination}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        page={pagination.currentPage}
                        totalItems={pagination.totalItems}
                     />
                  </CardContent>
               </Card>
            </Container>
            <ManufacturerCreateEditModal data={dataModal} isOpen={isOpen} onSubmit={onHandleCreateEdit} onClose={handleCloseModal} />
         </Box>
      </>
   )
}

Manufacturers.Layout = DashboardLayout

export default Manufacturers

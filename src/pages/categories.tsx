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
   Category,
   CategoryPayLoad,
   DEFAULT_PAGINATION,
   PageInfo,
   PaginationParams,
   Variables_Graphql
} from 'models'
import { useSnackbar } from 'notistack'
import CATEGORIES_QUERY from 'graphql/query/categories'
import UPDATE_CATEGORY from 'graphql/mutation/updateCategory'
import DELETE_CATEGORY from 'graphql/mutation/deleteCategory'
import CategoryCreateEditModal from 'components/category/modal'
import CREATE_CATEGORY from 'graphql/mutation/createCategory'

interface CategoriesDataTable {
   name: string
   address: string
   description: string
   _data: Category
}

const Categories = () => {
   const { enqueueSnackbar } = useSnackbar()
   const [rows, setRows] = useState<CategoriesDataTable[]>([])

   const [dataCategoryModal, setDataCategoryModal] = useState<Category | undefined>()
   const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

   const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION)
   const [rowsPerPage, setRowsPerPage] = useState(5)
   const [paginationQuery, setPaginationQuery] = useState<Variables_Graphql>({ take: rowsPerPage })
   const [pageInfo, setPageInfo] = useState<PageInfo>()

   const { data, refetch, loading } = useQuery(CATEGORIES_QUERY, {
      variables: { ...paginationQuery }
   })

   const [createCategory] = useMutation(CREATE_CATEGORY)
   const [updateCategory] = useMutation(UPDATE_CATEGORY)
   const [removeCategory] = useMutation(DELETE_CATEGORY)

   const headers = [
      { field: 'name', headerName: 'Tên danh mục' },
      // { field: 'address', headerName: 'Address' },
      { field: 'description', headerName: 'Miêu tả' }
   ]

   useEffect(() => {
      if (paginationQuery) {
         refetch(paginationQuery)
      }
   }, [paginationQuery, refetch])

   useEffect(() => {
      if (data) {
         console.log(data)

         const _data = data.categories

         const nodes_data = _data.items as Array<Category>

         // setCategories(nodes_data)

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
                     description: item.description,
                     _data: item
                  } as CategoriesDataTable)
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

      setPaginationQuery({
         skip: (value - 1) * rowsPerPage,
         take: rowsPerPage         
      })
      
      setPagination(prev => ({
         ...prev,
         currentPage: value
      }))
   }

   const handleCategoryModalOpen = (data?: Category) => {
      console.log(data)

      setDataCategoryModal(data)
      setIsCategoryModalOpen(true)
   }

   const handleCloseCategoryModal = () => {
      setDataCategoryModal(new Category())
      setIsCategoryModalOpen(false)
   }

   const onHandleDeleteCategory = async (id: string) => {
      try {
         await removeCategory({ variables: { input: { id } } })

         refetch()

         enqueueSnackbar('Success', { variant: 'success' })
      } catch (e: any) {
         enqueueSnackbar(e.message, { variant: 'error' })
      }
   }

   const onHandleCreateEditCategory = async (data: CategoryPayLoad) => {
      try {
         if (data && data.id) {
            await updateCategory({ variables: { input: data } })

            refetch()

            enqueueSnackbar('Success', { variant: 'success' })
         } else {
            await createCategory({ variables: { input: data } })

            refetch()

            enqueueSnackbar('Success', { variant: 'success' })
         }
         handleCloseCategoryModal()
      } catch (e: any) {
         enqueueSnackbar(e.message, { variant: 'error' })
      }
   }

   return (
      <>
         <Head>
            <title>Categories | Cheems Store</title>
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
                     Danh mục
                  </Typography>
                  <Box sx={{ m: 1 }}>
                     <Stack direction="row" spacing={2}>
                        <Button
                           color="primary"
                           variant="contained"
                           onClick={() => {
                              setDataCategoryModal(undefined)
                              setIsCategoryModalOpen(true)
                           }}
                        >
                           Thêm danh mục
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
                        onHandleEditButton={handleCategoryModalOpen}
                        onHandleDeleteButton={onHandleDeleteCategory}
                        handleChangePage={handleChangePagination}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        page={pagination.currentPage}
                        totalItems={pagination.totalCount}
                        subButton={false}
                     />
                  </CardContent>
               </Card>
            </Container>
            <CategoryCreateEditModal
               data={dataCategoryModal}
               isOpen={isCategoryModalOpen}
               onSubmit={onHandleCreateEditCategory}
               onClose={handleCloseCategoryModal}
            />
         </Box>
      </>
   )
}

Categories.Layout = DashboardLayout

export default Categories

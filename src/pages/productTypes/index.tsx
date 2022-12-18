import {
   Box,
   Button,
   Container,
   Divider,
   Paper,
   Typography,
   TablePagination
} from '@mui/material'
import { ProductTypeList, ProductListToolbar } from 'components/productType'
import {
   DEFAULT_PAGINATION,
   Edges as Edge,
   PageInfo,
   PaginationParams,
   ProductType,
   Variables_Graphql
} from 'models'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DashboardLayout } from 'components/layouts'
import { useLazyQuery, useMutation } from '@apollo/client'
import PRODUCT_TYPE, { ProductTypesFilterInput } from 'graphql/query/productTypes'
import { useRouter } from 'next/router'
import DELETE_PRODUCT_TYPE from 'graphql/mutation/deleteProductType'

const ProductTypes = () => {
   const { enqueueSnackbar } = useSnackbar()
   const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION)
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [filters, setFilters] = useState<Partial<ProductTypesFilterInput>>({})
   const [paginationQuery, setPaginationQuery] = useState<Variables_Graphql>({})
   const [pageInfo, setPageInfo] = useState<PageInfo>()
   const router = useRouter()

   const variables = useMemo(() => ({
      input: filters,
      ...paginationQuery
   }), [filters, paginationQuery])

   const [fetch, { data: productTypes, loading }] = useLazyQuery(PRODUCT_TYPE, { variables: variables })

   const [deleteProductType] = useMutation(DELETE_PRODUCT_TYPE)

   const [productTypeList, setProductTypeList] = useState<ProductType[]>([])
   const productListTitleRef = useRef<HTMLElement>(null)
   const executeScroll = () => {
      if (productListTitleRef.current) productListTitleRef.current.scrollIntoView()
   }

   useEffect(() => {
      setProductTypeList([])
      fetch()
   }, [variables])

   useEffect(() => {
      if(productTypes) {
         const productTypesList = productTypes.productTypes
         const list = productTypesList.edges.map((item: Edge) => item.node)
         const _pageInfo = productTypesList.pageInfo as PageInfo
         const _totalItems = productTypesList.totalCount
         setProductTypeList(list)
         setPageInfo(_pageInfo)
         setPagination(prev => ({
            ...prev,
            totalCount: _totalItems,
            totalPages: Math.ceil(_totalItems / 10)
         }))
      }
   }, [productTypes])

   const handleChangePagination = (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
      executeScroll()

      const currentPage = pagination.currentPage
      
      if(value === 0) {
         setPaginationQuery({
            after: null
         })
      }
      else {
         if(value > currentPage) {
            setPaginationQuery({
               after: pageInfo?.endCursor || null,
            })
         }
         else {
            setPaginationQuery({
               after: pageInfo?.startCursor || null,
            })
         }
      }
      setPagination(prev => ({
         ...prev,
         currentPage: value
      }))
   }

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPagination(prev => ({
         ...prev,
         currentPage: 0
      }))
    };

   const handleDeleteProduct = async (id: string) => {
      try {
         await deleteProductType({ variables: { input: { id } } })

         enqueueSnackbar("Delete Product Type Success!", { variant: "success" })

         fetch()
      } catch (error: any) {
         enqueueSnackbar(error.message, {
            variant: 'error'
         })
      }
   }

   const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
      setFilters((prev) => ({...prev}))
   }

   const handleSearch = (search: string) => {
      setFilters({
         ...filters,
      })
   }
   const handleChangeSorting = (categoriesIds: string[]) => {
      setFilters({
         ...filters,
         categoriesIds
      })
   }

   return (
      <>
         <Head>
            <title>Products | FurnitureStore</title>
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
                  <Typography sx={{ m: 1 }} variant="h4" ref={productListTitleRef}>
                     Product Types
                  </Typography>
                  <Box sx={{ m: 1 }}>
                     {/* <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
                        Import
                     </Button>
                     <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
                        Export
                     </Button> */}
                     <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                           router.push('/productTypes/create')
                        }}
                     >
                        Add products
                     </Button>
                  </Box>
               </Box>

               <Paper sx={{ mt: 1 }}>
                  {/* <Tabs value={filters.inStock} onChange={handleChangeTab}>
                     <Tab label="All" value="" />
                     <Tab label="Available" value="true" />
                     <Tab label="Out of stock" value="false" />
                  </Tabs> */}
                  <Divider />
                  <ProductListToolbar
                     filters={filters}
                     onSearch={handleSearch}
                     onChangeSorting={handleChangeSorting}
                  />
               </Paper>
               <ProductTypeList
                  productTypes={productTypeList}
                  loading={loading}
                  pagination={pagination}
                  onEditClick={(productType: ProductType) => {
                     router.push(`/productTypes/${productType.id}`)
                  }}
                  onDeleteClick={handleDeleteProduct}
               />

               {productTypeList && productTypeList.length > 0 && (
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 3
                     }}
                  >
                     <TablePagination
                        component="div"
                        count={pagination.totalCount}
                        page={pagination.currentPage}
                        onPageChange={handleChangePagination}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPage={rowsPerPage}
                     />
                  </Box>
               )}

               {/* <ProductTypeAddEditModal
                  isEdit={isEdit}
                  data={editProduct}
                  isOpen={isEditModalOpen}
                  onClose={handleCloseAddEditModal}
                  onSubmit={handleAddEditProduct}
               /> */}
            </Container>
         </Box>
      </>
   )
}

ProductTypes.Layout = DashboardLayout

export default ProductTypes

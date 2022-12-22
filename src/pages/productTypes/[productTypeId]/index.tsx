import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Container, Grid } from '@mui/material'
import { DashboardLayout } from 'components/layouts'
import { Media, Order, Product, ProductPayLoad, ProductType, ProductTypePayload } from 'models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useLazyQuery, useMutation } from '@apollo/client'
import PRODUCT_TYPE from 'graphql/query/productTypes'
import UPDATE_PRODUCT_TYPE from 'graphql/mutation/updateProductType'
import { ProductTypeAddEditModal as ProductTypeAddEditCard } from 'components/productType/product-type-add-edit-card'
import CREATE_PRODUCT_TYPE from 'graphql/mutation/createProductType'
import UPLOAD_MEDIAS from 'graphql/mutation/uploadMedias'
import ProductList from 'components/product/product-list'
import PRODUCT_QUERY from 'graphql/query/products'
import ProductCreateEditModal from 'components/product/modal-product'
import CREATE_PRODUCT from 'graphql/mutation/createProduct'

export interface ProductTypePageProps {}
function ProductTypePage(props: ProductTypePageProps) {
   const { enqueueSnackbar } = useSnackbar()
   const router = useRouter()

   const { productTypeId } = router.query

   const [fetch, { data, error }] = useLazyQuery(PRODUCT_TYPE, {
      variables: { input: { ids: productTypeId ? productTypeId : null } }
   })
   const [loadProduct, { data: productList_data }] = useLazyQuery(PRODUCT_QUERY, {
      variables: {
         input: {
            productTypesIds: [productTypeId]
         }
      }
   })

   const [uploadMedias] = useMutation(UPLOAD_MEDIAS)
   const [updateProductType] = useMutation(UPDATE_PRODUCT_TYPE)
   const [createProductType] = useMutation(CREATE_PRODUCT_TYPE)

   const [createProduct] = useMutation(CREATE_PRODUCT)

   const [productType, setProductType] = useState<ProductType | undefined>()
   const [productList, setProductList] = useState<Product[]>([])
   const [isOpen, setIsOpen] = useState(false)
   const [dataModal, setDataModal] = useState<Product>()

   useEffect(() => {
      if (productList_data) {
         const _productList = productList_data.products.items
         setProductList(_productList)
      }
   }, [productList_data])

   useEffect(() => {
      if (data) {
         console.log(data)
         setProductType(data.productTypes.items[0])
         loadProduct()
      }
   }, [data, loadProduct])

   useEffect(() => {
      if (productTypeId && productTypeId !== 'create') {
         fetch()
      }
      if (productTypeId && productTypeId === 'create') {
         setProductType(undefined)
      }
   }, [productTypeId, fetch])

   const onOpenModal = (data?: Product) => {
      const newProduct = new Product()
      newProduct.productTypesId = productType?.id || ''
      setDataModal(newProduct)
      setIsOpen(true)
   }

   const onCloseModal = () => {
      setIsOpen(false)
   }

   const onSubmitModal = async (product: ProductPayLoad) => {
      if (product.id && product.id !== '') {
         try {
            // await updateProductType({ variables: { input: product } })

            onCloseModal()

            enqueueSnackbar('Chỉnh sửa sản phẩm thành công', { variant: 'success' })

            loadProduct()
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      } else {
         try {
            await createProduct({ variables: { input: product } })

            onCloseModal()

            enqueueSnackbar('Tạo sản phẩm thành công', { variant: 'success' })

            loadProduct()
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      }
   }

   const handleCloseAddEdit = () => {
      router.push('/productTypes')
   }

   const handleAddEdit = async (productType: ProductTypePayload, medias: Media[]) => {
      // uploadMedias({ variables: { files } })

      console.log(productType);
      

      if (productType.id && productType.id !== '') {
         try {
            await updateProductType({ variables: { input: productType, mediasIds: medias.map(val => val.id) } })

            handleCloseAddEdit()

            enqueueSnackbar('Chỉnh sửa loại sản phẩm thành công', { variant: 'success' })
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      } else {
         try {
            await createProductType({ variables: { input: productType, medias: medias as Media[] } })

            handleCloseAddEdit()

            enqueueSnackbar('Tạo loại sản phẩm thành công', { variant: 'success' })
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      }
   }

   const handleUpdateOrder = async (payload: Partial<Order>) => {
      if (typeof productTypeId === 'string') {
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
            <title>Loại sản phẩm | FurnitureStore Dashboard</title>
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
                  <Link href="/productTypes" passHref>
                     <Button variant="text" startIcon={<ArrowBackIcon />}>
                        Product Types
                     </Button>
                  </Link>
               </Box>
               <Grid
                  container
                  sx={{
                     mt: 1
                  }}
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
               >
                  <Grid item xs={8} md={12} sm={12}>
                     {productType ? (
                        <ProductTypeAddEditCard
                           data={productType}
                           onSubmit={handleAddEdit}
                           onClose={handleCloseAddEdit}
                        />
                     ) : (
                        <ProductTypeAddEditCard
                           onSubmit={handleAddEdit}
                           onClose={handleCloseAddEdit}
                        />
                     )}
                  </Grid>
                  <Grid item xs={4} md={12} sm={12} hidden={error ? true : false}>
                     <Box>
                        <ProductList data={productList} onHandleAddButton={onOpenModal} />
                     </Box>
                  </Grid>
               </Grid>
            </Container>
            <ProductCreateEditModal
               data={dataModal}
               isOpen={isOpen}
               onClose={onCloseModal}
               onSubmit={onSubmitModal}
            />
         </Box>
      </>
   )
}

ProductTypePage.Layout = DashboardLayout
export default ProductTypePage

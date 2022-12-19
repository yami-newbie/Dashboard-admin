import {
   Card,
   CardHeader,
   CardContent,
   CardActions,
   Box,
   Divider,
   Stack,
   Button,
   IconButton
} from '@mui/material'
import { Product } from 'models'
import React from 'react'
import ProductItem from './product-item'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'

type Props = {
   data: Product[]
   onHandleAddButton: () => void
}

const ProductList = (props: Props) => {
   const { data, onHandleAddButton } = props
   return (
      <Card>
         <CardHeader
            title="Danh sách sản phẩm"
            action={
               <IconButton size="small" aria-label="Thêm sản phẩm" onClick={onHandleAddButton}>
                  <AddCircleOutlineRoundedIcon color="primary" fontSize="medium" />
               </IconButton>
            }
         />

         <Divider />
         <CardContent style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            <Stack spacing={2}>
               {(data || []).map(item => (
                  <ProductItem key={item.id} data={item} />
               ))}
            </Stack>
         </CardContent>
         <CardActions></CardActions>
      </Card>
   )
}

export default ProductList

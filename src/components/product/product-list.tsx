import { Card, CardHeader, CardContent, CardActions, Box, Divider, Stack, Button, IconButton } from '@mui/material'
import { Product } from 'models'
import React from 'react'
import ProductItem from './product-item'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

type Props = {
  data: Product[]
}

const ProductList = (props: Props) => {
  const { data } = props
  return (
    <Card>
      <CardHeader title="Product List" 
        action={
          <IconButton size='small' aria-label="Add Product">
            <AddCircleOutlineRoundedIcon color='primary' fontSize='medium'/>
          </IconButton>
        }
      />

      <Divider />
      <CardContent style={{ maxHeight: '100vh', overflowY: "auto" }}>
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
import { Card, CardActions, CardContent, CardHeader, Divider, TextField } from '@mui/material'
import { Product } from 'models'
import moment from 'moment'
import React from 'react'

type Props = {
   data: Product
}

const ProductItem = (props: Props) => {
   const { data } = props

   const manufactureInfo = data?.manufactureInfos

   const manufacture = manufactureInfo?.manufacturers

   return (
      <Card elevation={12}>
         <CardHeader title={manufacture?.name}></CardHeader>

         <Divider />

         <CardContent>
            <TextField
               label="Thời gian sản xuất"
               disabled
               value={moment(manufactureInfo?.manufacturedAt).format('DD-MM-YYYY')}
            />
         </CardContent>
         <CardActions></CardActions>
      </Card>
   )
}

export default ProductItem

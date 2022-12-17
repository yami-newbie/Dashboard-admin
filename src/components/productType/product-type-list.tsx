import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { PaginationParams, ProductType } from 'models'
import React from 'react'
import { renderPaginationText } from 'utils'
import { ProductTypeCard } from '.'
import { LoadingBackdrop } from 'components/loading'
import { Animation } from 'components/Animation'

export interface ProductListProps {
   productTypes?: ProductType[]
   pagination: PaginationParams
   onEditClick: Function
   onDeleteClick: Function
   loading: boolean
}

export function ProductTypeList({
   loading,
   productTypes,
   pagination,
   onEditClick,
   onDeleteClick
}: ProductListProps) {

   if(loading)
      return <Animation type={'bubbles'} color={'#ef5350'}/>

   return (
      <Box sx={{ pt: 3 }}>
         {productTypes &&
            (productTypes.length > 0 ? (
               <Typography variant="body1" sx={{ mb: 2 }}>
                  {/* {renderPaginationText(pagination)} */}
               </Typography>
            ) : (
               <Box
                  sx={{
                     my: 20,
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center'
                  }}
               >
                  <Typography variant="h5">
                     No product found. Please try again with new filters and search keyword.
                  </Typography>
               </Box>
            ))}
         <Grid container spacing={3}>
            {productTypes
               ? productTypes.map(productType => (
                    <Grid item key={productType.id} lg={3} md={4} sm={6} xs={12}>
                       <ProductTypeCard
                          productType={productType}
                          onEditClick={onEditClick}
                          onDeleteClick={onDeleteClick}
                       />
                    </Grid>
                 ))
               : Array.from(new Array(pagination.pageSize)).map((item, idx) => (
                    <Grid item key={idx} lg={3} md={4} sm={6} xs={12}>
                       <ProductTypeCard />
                    </Grid>
                 ))}
         </Grid>
      </Box>
   )
}

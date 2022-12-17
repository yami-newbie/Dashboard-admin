import {
   Box,
   Card,
   CardContent,
   Grid,
   InputAdornment,
   MenuItem,
   Select,
   SvgIcon,
   TextField,
   InputLabel,
   FormControl
} from '@mui/material'
import { Search as SearchIcon } from '../../icons/search'
import { useEffect, useRef, useState } from 'react'
import { Category  } from 'models'
import { ProductTypesFilterInput } from 'graphql/query/productTypes'
import { useQuery } from '@apollo/client'
import CATEGORIES_QUERY from 'graphql/query/categories'

export interface ProductListToolbarProps {
   onSearch: Function
   onChangeSorting: Function
   filters: Partial<ProductTypesFilterInput>
}
export const ProductListToolbar = ({
   onSearch,
   onChangeSorting,
   filters,
   ...restProps
}: ProductListToolbarProps) => {
   const { data, error, loading } = useQuery(CATEGORIES_QUERY)

   const [categories, setCategories] = useState<Category[]>([])

   const ref = useRef<NodeJS.Timeout | null>(null)

   useEffect(() => {
      setCategories(data?.categories?.nodes || [])
   }, [data])

   const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (ref.current) {
         clearTimeout(ref.current)
      }
      ref.current = setTimeout(() => {
         onSearch(e.target.value.trim())
      }, 500)
   }

   const handleChangeSort = (event: any) => {
      const value = event.target.value

      if(value === "all"){
         onChangeSorting(undefined)
         return
      }

      if(Array.isArray(value)){
         onChangeSorting(value)
      }
      else {
         onChangeSorting([value])
      }

   }

   return (
      <Box {...restProps}>
         <Card>
            <CardContent>
               <Grid container spacing={2}>
                  <Grid item sm={12} md={9}>
                     <TextField
                        fullWidth
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <SvgIcon fontSize="small" color="action">
                                    <SearchIcon />
                                 </SvgIcon>
                              </InputAdornment>
                           )
                        }}
                        placeholder="Search product"
                        variant="outlined"
                        onChange={handleChangeSearch}
                     />
                  </Grid>
                  <Grid item sm={12} md={3}>
                     <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sort by Category</InputLabel>
                        <Select
                           labelId="demo-simple-select-label"
                           fullWidth
                           label="Sort by Category"
                           multiple
                           value={filters.categoriesIds ? filters.categoriesIds : [] }
                           onChange={handleChangeSort}
                        >
                           {/* <MenuItem value="all">All</MenuItem> */}
                           {categories.map((category) => (
                              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Grid>
               </Grid>
            </CardContent>
         </Card>
      </Box>
   )
}

import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
   Box,
   Button,
   Card,
   CardHeader,
   Divider,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
   Skeleton
} from '@mui/material'
import { formatDistance, parseISO } from 'date-fns'
import { Product, ProductType } from 'models'
import NextLink from 'next/link'
import useSWR from 'swr'

const NUMBER_PRODUCTS: number = 6

const ProductSkeleton = ({ numberProducts }: { numberProducts: number }) => (
   <List>
      {Array.from(new Array(numberProducts)).map((product, index) => (
         <ListItem divider={index < NUMBER_PRODUCTS - 1} key={index}>
            <ListItemAvatar>
               <Skeleton variant="rectangular" width={48} height={48} />
            </ListItemAvatar>
            <ListItemText
               primary={<Skeleton variant="text" />}
               secondary={<Skeleton variant="text" />}
            />
         </ListItem>
      ))}
   </List>
)

export const LatestProducts = (props: any) => {
   // const { data: products } = useSWR(
   //    `products?page=1&pageSize=${NUMBER_PRODUCTS}&orderBy=updatedAt-desc`,
   //    {
   //       revalidateOnFocus: true
   //    }
   // )

   return (
      <Card {...props}>
         <CardHeader
            subtitle={`${props.products ? props.products.length : 0} in total`}
            title="Latest Products"
         />
         <Divider />
         {props.products ? (
            <List>
               {props.products.map((product: ProductType, i: number) => (
                  <ListItem divider={i < props.products.length - 1} key={product.id}>
                     <ListItemAvatar>
                        <img
                           alt="no image"
                           src={product?.medias?.[0]?.filePath || ""}
                           style={{
                              height: 48,
                              width: 48
                           }}
                        />
                     </ListItemAvatar>
                     <ListItemText
                        primary={product?.name}
                        secondary={`Updated ${formatDistance(
                           parseISO(product?.updatedAt),
                           new Date(),
                           { addSuffix: true }
                        )}`}
                     />
                  </ListItem>
               ))}
            </List>
         ) : (
            <ProductSkeleton numberProducts={NUMBER_PRODUCTS} />
         )}
         <Divider />
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'flex-end',
               p: 2
            }}
         >
            <NextLink href={'/products'} passHref>
               <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
                  View all
               </Button>
            </NextLink>
         </Box>
      </Card>
   )
}

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import {
   Avatar,
   Box,
   Card,
   CardContent,
   CardMedia,
   CircularProgress,
   Divider,
   Grid,
   IconButton,
   Skeleton,
   Tooltip,
   Typography
} from '@mui/material'
import { ProductType } from 'models'
import { useEffect, useState } from 'react'
import { ConfirmDialog } from './confirm-dialog'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

interface ProductCardProps {
   productType?: ProductType
   onEditClick?: Function
   onDeleteClick?: Function
}
export const ProductTypeCard = ({
   productType,
   onEditClick,
   onDeleteClick,
   ...rest
}: ProductCardProps) => {
   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
   const [src, setSrc] = useState('/static/images/no-image.jpg')

   useEffect(() => {
      if(productType) {
         fetch(productType.medias?.[0]?.filePath || "/static/images/no-image.jpg").then((res) => {
            if(res.ok){
               console.log(res);
            }
            if(res.ok) {
               setSrc(res.url)
            }
         })
      }

   }, [productType])

   return productType ? (
      <Card
         sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
         }}
         {...rest}
         elevation={6}
      >
         <CardMedia
            component="img"
            height="220"
            image={src}
            loading="lazy"
            alt={productType.name}
         />
         <CardContent>
            <Typography align="center" color="textPrimary" gutterBottom variant="h5">
               {productType.name}
            </Typography>
            <Tooltip title={productType.description || false} placement="top">
               <Typography noWrap align="center" color="textPrimary" variant="body1">
                  {productType.description}
               </Typography>
            </Tooltip>
         </CardContent>

         <Box sx={{ flexGrow: 1 }} />
         <Divider />
         <Box sx={{ p: 2 }}>
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
               <Grid
                  item
                  sx={{
                     alignItems: 'center',
                     display: 'flex'
                  }}
               >
                  <Inventory2Icon color="action" />
                  {/* <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                     {product.quantity} In Stocks
                  </Typography> */}
               </Grid>
               <Grid
                  item
                  sx={{
                     alignItems: 'center',
                     display: 'flex'
                  }}
               >
                  <Tooltip title="Ch???nh s???a" placement="top">
                     {/* <Link href={`/productTypes/${productType.id}`} passHref> */}
                     <IconButton
                        onClick={() => {
                           if (onEditClick) onEditClick(productType)
                        }}
                        color="primary"
                     >
                        <EditIcon />
                     </IconButton>
                     {/* </Link> */}
                  </Tooltip>
                  <Tooltip title="X??a" placement="top">
                     <IconButton color="error" onClick={() => setIsDeleteDialogOpen(true)}>
                        <DeleteIcon />
                     </IconButton>
                  </Tooltip>
               </Grid>
            </Grid>
         </Box>

         <ConfirmDialog
            isOpen={isDeleteDialogOpen}
            title="B???n c?? ch???c kh??ng?"
            body="B???n c?? ch???c ch???n x??a lo???i s???n ph???m n??y?"
            onClose={() => setIsDeleteDialogOpen(false)}
            onSubmit={async () => {
               if (onDeleteClick) await onDeleteClick(productType.id)
               setIsDeleteDialogOpen(false)
            }}
            icon={
               <Avatar sx={{ bgcolor: 'rgba(209, 67, 67, 0.08)', color: 'rgb(209, 67, 67)' }}>
                  <ReportProblemIcon />
               </Avatar>
            }
         />
      </Card>
   ) : (
      <Card
         sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
         }}
         {...rest}
      >
         <Skeleton variant="rectangular" height={220} />
         {/* <CardMedia component="img" height="220" component={<Skeleton variant="rectangular" />} /> */}
         <CardContent>
            <Typography align="center" color="textPrimary" gutterBottom variant="h5">
               <Skeleton variant="text" />
            </Typography>
            <Typography noWrap align="center" color="textPrimary" variant="body1">
               <Skeleton variant="text" />
            </Typography>
         </CardContent>

         <Box sx={{ flexGrow: 1 }} />
         <Divider />
         <Box sx={{ p: 2 }}>
            <Skeleton variant="text" />
         </Box>
      </Card>
   )
}

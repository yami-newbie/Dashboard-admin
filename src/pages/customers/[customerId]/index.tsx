import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
   Avatar,
   Box,
   Button,
   Card,
   CardContent,
   CardHeader,
   Chip,
   Container,
   Divider,
   Grid,
   Skeleton,
   Typography
} from '@mui/material'
import { DashboardLayout } from 'components/layouts'
import PencilIcon from 'icons/pencil'
import { User } from 'models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { getInitials } from 'utils'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { ConfirmDialog } from 'components/productType/confirm-dialog'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import { useQuery } from '@apollo/client'
import USERS_QUERY from 'graphql/query/users'
import { CustomerOrderListCard, UserBasicInfoCard } from 'components/user'

export interface UCustomerInfoPageProps {}
function CustomerInfoPage(props: UCustomerInfoPageProps) {
   const { enqueueSnackbar } = useSnackbar()
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
   const [user, setUser] = useState<User>()
   const router = useRouter()
   const { customerId } = router.query

   const { data: _user } = useQuery(USERS_QUERY, { variables: { input: { ids: [customerId] } } })

   useEffect(() => {
      if (_user) {
         const _data = _user.users

         const count = _data.totalCount

         if (count === 1) {
            setUser(_data.items[0])
         }
      }
   }, [_user])

   const handleDeleteUser = async () => {
      if (typeof customerId === 'string') {
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
            <title>Thông tin tài khoản | FurnitureStore Dashboard</title>
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
                  <Link href="/users" passHref>
                     <Button variant="text" startIcon={<ArrowBackIcon />}>
                        Danh sách người dùng
                     </Button>
                  </Link>
               </Box>
               <Grid
                  container
                  sx={{
                     mt: 1,
                     alignItems: 'center',
                     justifyContent: 'space-between'
                  }}
               >
                  {user ? (
                     <Grid item sx={{ m: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                           <Box>
                              <Avatar
                                 sx={{ width: 56, height: 56 }}
                                 src={user?.medias?.[0]?.filePath || ''}
                                 alt={getInitials(user.fullname)}
                              ></Avatar>
                           </Box>
                           <Box sx={{ flex: 1 }}>
                              <Typography variant="h4">{user.email}</Typography>
                              <Typography
                                 variant="subtitle2"
                                 sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                              >
                                 uid: <Chip size="small" label={user.id} />
                                 <Chip
                                    size="small"
                                    label={user.status ? 'Hoạt động' : 'Ngừng hoạt động'}
                                    color={user.status ? 'success' : 'error'}
                                 />
                              </Typography>
                           </Box>
                        </Box>
                     </Grid>
                  ) : (
                     <Grid item>
                        <Typography sx={{ m: 1 }} variant="h4">
                           <Skeleton variant="text" width="300px" />
                        </Typography>
                        <Typography sx={{ m: 1 }} variant="body2" color="textSecondary">
                           <Skeleton variant="text" width="300px" />
                        </Typography>
                     </Grid>
                  )}
                  {/* <Grid item sx={{ display: 'flex', gap: 2 }}>
                     <Link href={`/users/${customerId}/edit`} passHref>
                        <Button variant="outlined" endIcon={<PencilIcon width={20} />}>
                           Chỉnh sửa
                        </Button>
                     </Link>
                  </Grid> */}
               </Grid>

               <Box sx={{ ml: 1, mt: 4 }}>
                  <UserBasicInfoCard user={user} />
               </Box>

               <Box sx={{ ml: 1, mt: 4 }}>
                  <CustomerOrderListCard />
               </Box>

               <Box hidden sx={{ ml: 1, mt: 4 }}>
                  <Card>
                     <CardHeader title="Quản lý dữ liệu" />
                     <Divider />
                     <CardContent>
                        <Box
                           sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'start',
                              gap: 1
                           }}
                        >
                           <Button
                              variant="outlined"
                              color="error"
                              onClick={() => setOpenConfirmDialog(true)}
                           >
                              Xóa tài khoản
                           </Button>
                           <Typography variant="body2" color="textSecondary">
                           Xóa tài khoản của người dùng này nếu họ yêu cầu, nếu không, vui lòng lưu ý rằng những gì đã bị xóa không bao giờ có thể lấy lại được.
                           </Typography>
                        </Box>
                     </CardContent>
                  </Card>

                  <ConfirmDialog
                     icon={
                        <Avatar
                           sx={{ bgcolor: 'rgba(209, 67, 67, 0.08)', color: 'rgb(209, 67, 67)' }}
                        >
                           <ReportProblemIcon />
                        </Avatar>
                     }
                     isOpen={openConfirmDialog}
                     title="Are you sure?"
                     body="Are you sure to delete this user?"
                     onSubmit={handleDeleteUser}
                     onClose={() => setOpenConfirmDialog(false)}
                  />
               </Box>
            </Container>
         </Box>
      </>
   )
}

CustomerInfoPage.Layout = DashboardLayout
export default CustomerInfoPage
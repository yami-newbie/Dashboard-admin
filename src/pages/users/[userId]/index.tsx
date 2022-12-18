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
import { UserBasicInfoCard } from 'components/user'

export interface UserDetailPageProps {}
function UserDetailPage(props: UserDetailPageProps) {
   const { enqueueSnackbar } = useSnackbar()
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
   const [user, setUser] = useState<User>()
   const router = useRouter()
   const { userId } = router.query
   const ref = useRef<HTMLInputElement>(null)

   const { data: _user } = useQuery(USERS_QUERY, { variables: { input: { ids: [userId] } } })

   useEffect(() => {
      if(_user) {
         const _data = _user.users

         const count = _data.totalCount

         if(count === 1) {
            setUser(_data.nodes[0])
         }

      }
   }, [_user])

   const handleDeleteUser = async () => {
      if (typeof userId === 'string') {
         try {
            
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      }
   }

   return <>
      <Head>
         <title>User Details | FurnitureStore Dashboard</title>
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
                     Users
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
                        <Box
                           onClick={() => { console.log(ref); ref.current?.click() }}
                        >
                           <Avatar 
                              sx={{ width: 56, height: 56 }}
                              src={user?.medias?.[0]?.filePath || ""}
                              alt={getInitials(user.fullname)}
                              >
                           </Avatar>
                        </Box>
                        <input ref={ref} hidden name='upload-image' type="file"/>
                        <Box sx={{ flex: 1 }}>
                           <Typography variant="h4">{user.email}</Typography>
                           <Typography
                              variant="subtitle2"
                              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                           >
                              user_id: <Chip size="small" label={user.id} />
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
               <Grid item sx={{ display: 'flex', gap: 2 }}>
                  <Link href={`/users/${userId}/edit`} passHref>
                     <Button variant="outlined" endIcon={<PencilIcon width={20} />}>
                        Edit
                     </Button>
                  </Link>
               </Grid>
            </Grid>

            <Box sx={{ ml: 1, mt: 4 }}>
               <UserBasicInfoCard user={user} />
            </Box>

            <Box sx={{ ml: 1, mt: 4 }}>
               {/* <UserOrderListCard /> */}
            </Box>

            <Box sx={{ ml: 1, mt: 4 }}>
               <Card>
                  <CardHeader title="Data management" />
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
                           Delete Account
                        </Button>
                        <Typography variant="body2" color="textSecondary">
                           Remove this user’s account if he/she requested that, if not please
                           be aware that what has been deleted can never brought back.
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
   </>;
}

UserDetailPage.Layout = DashboardLayout
export default UserDetailPage

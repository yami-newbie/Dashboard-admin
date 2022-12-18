import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Avatar, Box, Button, Chip, Container, Grid, Skeleton, Typography } from '@mui/material'
import { UserBasicInfoCardEdit } from 'components/user'
import { DashboardLayout } from 'components/layouts'
import { User } from 'models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getInitials } from 'utils'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useQuery } from '@apollo/client'
import USERS_QUERY from 'graphql/query/users'

export interface EditCustomerPageProps {}

const EditCustomerPage = (props: EditCustomerPageProps) => {
   const { enqueueSnackbar } = useSnackbar()
   const router = useRouter()
   const { userId } = router.query
   const { data: _user } = useQuery(USERS_QUERY, { variables: { input: { ids: [userId] } } })

   const [user, setUser] = useState<User>()

   useEffect(() => {
      if(_user) {
         const _data = _user.users

         const count = _data.totalCount

         if(count === 1) {
            setUser(_data.nodes[0])
         }

      }
   }, [_user])

   const handleUpdateBasicInfo = async (payload: Partial<User>) => {
      if (typeof userId === 'string') {
         try {
            
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      }
   }

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
         <title>Edit User | FurnitureStore Dashboard</title>
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
                        <Avatar sx={{ width: 56, height: 56 }} src="">
                           {getInitials(user.fullname)}
                        </Avatar>
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
            </Grid>

            <Box sx={{ ml: 1, mt: 4 }}>
               <UserBasicInfoCardEdit
                  user={user}
                  onSave={handleUpdateBasicInfo}
                  onDelete={handleDeleteUser}
               />
            </Box>
         </Container>
      </Box>
   </>;
}

EditCustomerPage.Layout = DashboardLayout

export default EditCustomerPage

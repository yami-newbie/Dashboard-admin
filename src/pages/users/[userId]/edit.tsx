import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Avatar, Box, Button, Chip, Container, Grid, Skeleton, Typography } from '@mui/material'
import { UserBasicInfoCardEdit } from 'components/user'
import { DashboardLayout } from 'components/layouts'
import { User, UserPayload } from 'models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { getInitials } from 'utils'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { useMutation, useQuery } from '@apollo/client'
import USERS_QUERY from 'graphql/query/users'
import UPDATE_USER from 'graphql/mutation/updateUserAdmin'
import UPLOAD_MEDIAS from 'graphql/mutation/uploadMedias'
import UPDATE_USER_PROFILE_IMAGE from 'graphql/mutation/updateUsersProfileImage'
import de from 'date-fns/esm/locale/de/index.js'

export interface EditCustomerPageProps { }

const EditCustomerPage = (props: EditCustomerPageProps) => {
   const { enqueueSnackbar } = useSnackbar()
   const router = useRouter()
   const { userId } = router.query

   const { data: _user, refetch } = useQuery(USERS_QUERY, { variables: { input: { ids: [userId] } } })

   const [ uploadAvatar ] = useMutation(UPDATE_USER_PROFILE_IMAGE)
   const [updateUser] = useMutation(UPDATE_USER)

   const [user, setUser] = useState<User>()
   const [file, setFile] = useState<File | null>(null)
   const [src, setSrc] = useState(user?.medias?.[0]?.filePath)

   const ref = useRef<HTMLInputElement>(null)

   useEffect(() => {
      if(file){
         setSrc(URL.createObjectURL(file))
      }
   }, [file])

   useEffect(() => {
      if (_user) {
         const _data = _user.users

         const count = _data.totalCount

         if (count === 1) {
            setUser(_data.items[0])
         }
      }
   }, [_user])

   const handleUpdateBasicInfo = async (payload: UserPayload) => {
      if (user && user.id) {
         try {
            if(typeof payload.password === "undefined" || payload.password === "")
               delete payload.password

            if(file) {
               await uploadAvatar({ variables: { input: { file: file, userId: user.id } } })
            }

            const res = await updateUser({ variables: { input: payload } })



            enqueueSnackbar("Cập nhật thông tin thành công", { variant: "success" })
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      }
   }

   const handleDisableEnableUser = async () => {
      if (user && user.id) {
         try {
            await updateUser({ variables: { input: { id: user.id, status: !user.status } } })

            enqueueSnackbar(`${user.status ? "Kích hoạt" : "Vô hiệu hóa"} tài khoản thành công`, {
               variant: "success"
            })

            setUser(prev => ({
               ...prev,
               status: !prev?.status
            } as User))
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
            <title>Quản lý người dùng | FurnitureStore Dashboard</title>
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
                           <Avatar
                              sx={{ width: 56, height: 56, ':hover': { cursor: 'pointer' } }}
                              onClick={() => {
                                 ref.current?.click()
                              }}
                              src={src}
                              alt={getInitials(user.fullname)}
                           ></Avatar>
                           <input
                              ref={ref}
                              hidden
                              type="file"
                              onChange={value => setFile(value.target.files?.[0] || null)}
                           />

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
               </Grid>

               <Box sx={{ ml: 1, mt: 4 }}>
                  <UserBasicInfoCardEdit
                     user={user}
                     onSave={handleUpdateBasicInfo}
                     onDelete={handleDisableEnableUser}
                  />
               </Box>
            </Container>
         </Box>
      </>
   )
}

EditCustomerPage.Layout = DashboardLayout

export default EditCustomerPage

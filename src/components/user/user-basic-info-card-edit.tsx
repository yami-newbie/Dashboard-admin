import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import {
   Avatar,
   Button,
   Card,
   CardActions,
   CardContent,
   CardHeader,
   Divider,
   Grid,
   Skeleton,
   Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { regexVietnamesePhoneNumber } from 'constants/regexes'
import { Province, Role, User, UserPayload } from 'models'
import React, { MouseEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Link from 'next/link'
import { ConfirmDialog } from 'components/productType/confirm-dialog'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import { LoadingBackdrop } from 'components/loading'
import moment from 'moment'
import { useQuery } from '@apollo/client'
import ROLES_QUERY from 'graphql/query/roles'
import { LoadingButton } from '@mui/lab'

export interface UserBasicInfoCardEditProps {
   user?: User
   onSave: Function
   onDelete: Function
}

const schema = yup.object().shape({
   name: yup.string().max(255),
   phone: yup
      .string()
      .max(255)

      .test('is-vietnamese-phonenumber1', 'Incorrect phone number format.', number => {
         if (!number) return true

         return regexVietnamesePhoneNumber.test(number)
      }),
   email: yup.string().email().max(255).nullable()
})
export function UserBasicInfoCardEdit({ user, onSave, onDelete }: UserBasicInfoCardEditProps) {
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
   const [loading, setLoading] = useState(false)
   const [roles, setRoles] = useState<Role[]>([])

   const { data: _roles } = useQuery(ROLES_QUERY)

   const {
      control,
      formState: { isSubmitting },
      handleSubmit,
      reset
   } = useForm<UserPayload>({
      defaultValues: new UserPayload(),
      resolver: yupResolver(schema)
   })

   useEffect(() => {
      if (user) {
         reset({
            id: user?.id || '',
            fullname: user?.fullname || '',
            phone: user?.phone || '',
            email: user?.email || '',
            dob: moment(user?.dob || undefined).format('YYYY-MM-DD'),
            address: user?.address || '',
            rolesId: user?.rolesId || '',
            status: user?.status || false,
            password: user?.password || ''
         })
      }
   }, [user, reset])

   useEffect(() => {
      const _data = _roles?.roles.items
      setRoles(_data || [])
   }, [_roles])

   const handleSave = async (values: UserPayload) => {
      console.log(values)
      if (onSave) {
         const payload = { ...values }
         await onSave(payload)
      }
   }

   const handleDeleteClick = async (event: MouseEvent) => {
      setOpenConfirmDialog(false)
      setLoading(true)
      if (onDelete) await onDelete()
      setLoading(false)
   }

   function randomColor() {
      let backgroundColor = [
         '#ab000d',
         '#5c007a',
         '#00227b',
         '#00701a',
         '#8c9900',
         '#c68400',
         '#40241a',
         '#29434e'
      ]
      let random = Math.floor(Math.random() * backgroundColor.length)
      return backgroundColor[random]
   }

   return (
      <Card>
         <LoadingBackdrop open={loading} />

         <CardHeader
            title="Edit user"
            action={
               <LoadingButton
                  variant="text"
                  loading={false}
                  color="error"
                  disabled={isSubmitting}
                  onClick={() => setOpenConfirmDialog(true)}
               >
                  {!user?.status ? 'Disabled User' : 'Enabled User'}
               </LoadingButton>
            }
         />
         <Divider />
         <CardContent>
            <form onSubmit={handleSubmit(handleSave)}>
               <Typography variant="subtitle1">Account information</Typography>
               <Grid container columnSpacing={3} sx={{ mb: 2 }}>
                  <Grid item md={12} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting || !user}
                        control={control}
                        name="fullname"
                        label="Full Name"
                     />
                  </Grid>
                  {/* <Grid item md={3} xs={12}>
                     <CustomTextField
                        disabled={true}
                        control={control}
                        name="username"
                        label="Username"
                     />
                  </Grid> */}
                  <Grid item md={4} xs={12}>
                     <CustomTextField
                        control={control}
                        disabled={isSubmitting || !user}
                        name="email"
                        label="Email"
                     />
                  </Grid>
                  <Grid item md={4} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting || !user}
                        control={control}
                        type="number"
                        name="phone"
                        label="Phone Number"
                     />
                  </Grid>
                  <Grid item md={4} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting || !user}
                        control={control}
                        name="dob"
                        type="date"
                        label="Date of bith"
                     />
                  </Grid>
               </Grid>
               <Divider />
               <Grid container columnSpacing={3}>
                  <Grid item md={6} xs={12}>
                     <CustomSelectField
                        disabled={isSubmitting || !user}
                        control={control}
                        name="rolesId"
                        label="Role"
                        options={(roles || []).map(item => ({ value: item.id, label: item.name }))}
                     />
                  </Grid>

                  <Grid item md={12} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting || !user}
                        control={control}
                        name="address"
                        label="Address"
                     />
                  </Grid>
               </Grid>
            </form>
         </CardContent>
         {user && (
            <CardActions sx={{ m: 2, justifyContent: 'space-between' }}>
               <Box sx={{ display: 'flex', gap: 2 }}>
                  <Link href={`/users/${user.id}`} passHref>
                     <Button variant="outlined" disabled={isSubmitting}>
                        Cancel
                     </Button>
                  </Link>
                  <Button
                     variant="contained"
                     onClick={handleSubmit(handleSave)}
                     disabled={isSubmitting}
                  >
                     Update
                  </Button>
               </Box>
            </CardActions>
         )}

         <ConfirmDialog
            icon={
               <Avatar sx={{ bgcolor: 'rgba(209, 67, 67, 0.08)', color: 'rgb(209, 67, 67)' }}>
                  <ReportProblemIcon />
               </Avatar>
            }
            isOpen={openConfirmDialog}
            title="Are you sure?"
            body="Are you sure to delete this user?"
            onSubmit={handleDeleteClick}
            onClose={() => setOpenConfirmDialog(false)}
         />
      </Card>
   )
}

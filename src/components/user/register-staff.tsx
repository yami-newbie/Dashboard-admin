import { useQuery } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { regexVietnamesePhoneNumber } from 'constants/regexes'
import ROLES_QUERY from 'graphql/query/roles'
import { RegisterStaffPayload, Role } from 'models'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
   fullname: yup.string().required("Bạn phải điền đầy đủ họ và tên"),
   email: yup.string().email("Email không đúng định dạng").required("Bạn phải điền email"),
   password: yup.string().required("Bạn phải điền mật khẩu"),
   confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp').required(""),
   role: yup.string().required("Bạn phải chọn chức vụ"),
   phone: yup
      .string()
      .label('Số điện thoại')
      .test('is-vietnamese-phonenumber', 'Số điện thoại không đúng định dạng.', number => {
         if (!number) return true

         return regexVietnamesePhoneNumber.test(number)
      })
      .nullable(true),
})

type Props = {
   open: boolean,
   onClose: () => void,
   handleSave: (payload: RegisterStaffPayload) => any
}

const RegisterStaff = (props: Props) => {
   const {
      open,
      onClose,
      handleSave
   } = props

   const form = useForm<RegisterStaffPayload>({
      defaultValues: new RegisterStaffPayload(),
      resolver: yupResolver(schema)
   })
   const {
      reset,
      control,
      formState: { isSubmitting }
   } = form

   const { data: _roles } = useQuery(ROLES_QUERY)
   
   const [roles, setRoles] = useState<Role[]>([])

   useEffect(() => {
      const _data = _roles?.roles.items
      setRoles(_data || [])
   }, [_roles])

   const handleClose = () => {
      onClose()
      reset(new RegisterStaffPayload())
   }
   
   return (
      <Dialog open={open} onClose={handleClose} scroll="body">
         <DialogTitle>
            <Typography variant='h4'>Đăng ký tài khoản</Typography>
         </DialogTitle>
         <DialogContent>
            <form>
               <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="fullname"
                        label="Họ và tên"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="email"
                        label="Email"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="dob"
                        type="date"
                        label="Ngày sinh"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="phone"
                        label="Số điện thoại"
                     />
                  </Grid>
                  <Grid item md={8} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="address"
                        label="Địa chỉ"
                     />
                  </Grid>
                  <Grid item md={4} xs={12}>
                     <CustomSelectField
                        disabled={isSubmitting}
                        control={control}
                        name="role"
                        label="Chức vụ"
                        options={(roles || []).map(item => ({ value: item.id, label: item.description }))}
                     />
                  </Grid>
                  <Grid item md={12} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        type="password"
                        name="password"
                        label="Mật khẩu"
                     />
                  </Grid>
                  <Grid item md={12} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        type="password"
                        name="confirmPassword"
                        label="Xác nhận mật khẩu"
                     />
                  </Grid>
               </Grid>
            </form>
         </DialogContent>
         <DialogActions>
            <Button disabled={isSubmitting} onClick={handleClose}>
               Hủy
            </Button>
            <LoadingButton
               loading={isSubmitting}
               type="submit"
               variant="contained"
               onClick={form.handleSubmit(handleSave)}
            >
               Lưu
            </LoadingButton>
         </DialogActions>
      </Dialog>
   )
}

export default RegisterStaff
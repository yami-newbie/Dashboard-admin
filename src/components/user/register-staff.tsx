import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { CustomTextField } from 'components/form-controls'
import { RegisterStaffPayload } from 'models'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
   fullname: yup.string().required(),
   emal: yup.string().required(),
   password: yup.string().required(),
   confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
   role: yup.string().required()
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

   const handleClose = () => {
      onClose()
      reset()
   }
   
   return (
      <Dialog open={open} onClose={handleClose} scroll="body">
         <DialogTitle>
            <Typography variant='h4'>Đăng ký tài khoản</Typography>
         </DialogTitle>
         <DialogContent>
            <form>
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="fullname"
                  label="Họ và tên"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="email"
                  label="Email"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="phone"
                  label="Số điện thoại"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="address"
                  label="Địa chỉ"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="description"
                  label="Miêu tả"
                  multiline={true}
                  rows={4}
               />
            </form>
         </DialogContent>
         <DialogActions>
            <Button disabled={isSubmitting} onClick={onClose}>
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
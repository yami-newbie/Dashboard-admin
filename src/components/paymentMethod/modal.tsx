import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { PaymentMethod, PaymentMethodPayLoad } from 'models'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { LoadingButton } from '@mui/lab'

type Props = {
   data?: PaymentMethod,
   isOpen: boolean,
   onClose: () => void,
   onSubmit: (values: PaymentMethodPayLoad) => Promise<void>,
   
}

const schema = yup.object().shape({
   name: yup.string().required(),
   currency: yup.string().required()
})

const PaymentMethodCreateEditModal = (props: Props) => {

   const { data, onClose, isOpen, onSubmit } = props

   const [files, setFiles] = useState<File[]>()

   const form = useForm<PaymentMethodPayLoad>({
      defaultValues: new PaymentMethodPayLoad(),
      resolver: yupResolver(schema)
   })
   const {
      reset,
      control,
      formState: { isSubmitting }
   } = form

   const handleSavePaymentMethod = async (values: PaymentMethodPayLoad) => {
      if (onSubmit) await onSubmit(values)
   }

   useEffect(() => {
      console.log(data)
      if (data && data.id) {
         reset({
            id: data?.id || "",
            name: data?.name || "",
            description: data?.description || "",
            currency: data?.currency || ""
         })
      } else {
         reset({
            name: "",
            description: "",
            currency: ""
         })
      }
   }, [data, reset])

   const handleClose = () => {
      onClose()
      reset()
   }

   return (
      <Dialog open={isOpen} onClose={handleClose} scroll="body">
         <DialogTitle>Payment Method</DialogTitle>
         <DialogContent>
            <form>
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="name"
                  label="Payment Method Name"
               />
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="description"
                  label="Description"
                  multiline={true}
                  rows={4}
               />
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="currency"
                  label="Currency"
               />
            </form>
         </DialogContent>
         <DialogActions>
            <Button disabled={isSubmitting} onClick={onClose}>
               Cancel
            </Button>
            <LoadingButton
               loading={isSubmitting}
               type="submit"
               variant="contained"
               onClick={form.handleSubmit(handleSavePaymentMethod)}
            >
               Save
            </LoadingButton>
         </DialogActions>
      </Dialog>
   )
}

export default PaymentMethodCreateEditModal
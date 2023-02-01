import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { Manufacturer, ManufacturerPayLoad, Media } from 'models'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { LoadingButton } from '@mui/lab'
import FileUpload from 'components/file-upload/file-upload'

type Props = {
   data?: Manufacturer
   isOpen: boolean
   onClose: () => void
   onSubmit: (values: ManufacturerPayLoad) => Promise<void>
}

const schema = yup.object().shape({
   name: yup.string().required()
})

const ManufacturerCreateEditModal = (props: Props) => {
   const { data, onClose, isOpen, onSubmit } = props

   const [medias, setMedias] = useState<Media[]>([])

   const form = useForm<ManufacturerPayLoad>({
      defaultValues: new ManufacturerPayLoad(),
      resolver: yupResolver(schema)
   })
   const {
      reset,
      control,
      formState: { isSubmitting }
   } = form

   const handleSaveManufacturer = async (values: ManufacturerPayLoad) => {
      if (onSubmit) await onSubmit(values)
   }

   useEffect(() => {
      console.log(data)
      if (data && data.id) {
         reset({
            id: data?.id || '',
            address: data?.address || '',
            description: data?.description || '',
            name: data?.name || ''
         })
      } else {
         reset({
            address: '',
            description: '',
            name: ''
         })
      }
   }, [data, reset])

   const handleClose = () => {
      onClose()
      reset()
   }

   return (
      <Dialog open={isOpen} onClose={handleClose} scroll="body">
         <DialogTitle>Hãng sản xuất</DialogTitle>
         <DialogContent>
            <form>
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="name"
                  label="Tên hãng"
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
               onClick={form.handleSubmit(handleSaveManufacturer)}
            >
               Lưu
            </LoadingButton>
         </DialogActions>
      </Dialog>
   )
}

export default ManufacturerCreateEditModal

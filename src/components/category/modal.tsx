import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { Category, CategoryPayLoad } from 'models'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { LoadingButton } from '@mui/lab'

type Props = {
   data?: Category
   isOpen: boolean
   onClose: () => void
   onSubmit: (values: CategoryPayLoad, files: File[]) => Promise<void>
}

const schema = yup.object().shape({
   name: yup.string().required()
})

const CategoryCreateEditModal = (props: Props) => {
   const { data, onClose, isOpen, onSubmit } = props

   const [files, setFiles] = useState<File[]>()

   const form = useForm<CategoryPayLoad>({
      defaultValues: new CategoryPayLoad(),
      resolver: yupResolver(schema)
   })
   const {
      reset,
      control,
      formState: { isSubmitting }
   } = form

   const handleSaveCategory = async (values: CategoryPayLoad) => {
      if (onSubmit) await onSubmit(values, files || [])
   }

   useEffect(() => {
      console.log(data)
      if (data && data.id) {
         reset({
            id: data?.id || '',
            description: data?.description || '',
            name: data?.name || ''
         })
      } else {
         reset({
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
         <DialogTitle>Category</DialogTitle>
         <DialogContent>
            <form>
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="name"
                  label="Category Name"
               />
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="description"
                  label="Description"
                  multiline={true}
                  rows={4}
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
               onClick={form.handleSubmit(handleSaveCategory)}
            >
               Save
            </LoadingButton>
         </DialogActions>
      </Dialog>
   )
}

export default CategoryCreateEditModal

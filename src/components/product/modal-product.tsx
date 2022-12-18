import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { ManufactureInfo, Manufacturer, Product, ProductPayLoad } from 'models'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { LoadingButton } from '@mui/lab'
import moment from 'moment'
import { useLazyQuery } from '@apollo/client'
import MANUFACTUREINFOS_QUERY from 'graphql/query/manufactureInfos'

type Props = {
   data?: Product
   isOpen: boolean
   onClose: () => void
   onSubmit: (values: ProductPayLoad) => Promise<void>
}

const schema = yup.object().shape({})

const ProductCreateEditModal = (props: Props) => {
   const { data, onClose, isOpen, onSubmit } = props

   const [fetch, { data: options }] = useLazyQuery(MANUFACTUREINFOS_QUERY)

   useEffect(() => {
      if (isOpen) {
         fetch()
      }
   }, [isOpen])

   const form = useForm<ProductPayLoad>({
      defaultValues: new ProductPayLoad(),
      resolver: yupResolver(schema)
   })
   const {
      reset,
      control,
      formState: { isSubmitting }
   } = form

   const handleSaveManufacturer = async (values: ProductPayLoad) => {
      if (onSubmit) await onSubmit(values)
   }

   useEffect(() => {
      console.log(data)
      if (data && data.id) {
         reset({
            id: data?.id || '',
            manufactureInfosId: data?.manufactureInfosId || '',
            productTypesId: data?.productTypesId || ''
         })
      } else {
         reset({
            productTypesId: data?.productTypesId || '',
            manufactureInfosId: ''
         })
      }
   }, [data, reset])

   const handleClose = () => {
      onClose()
      reset()
   }

   return (
      <Dialog open={isOpen} onClose={handleClose} scroll="body">
         <DialogTitle>Manufacturer Info</DialogTitle>
         <DialogContent>
            <form>
               <CustomSelectField
                  disabled={isSubmitting}
                  control={control}
                  name="manufactureInfosId"
                  label="Manufacturer Info"
                  options={((options?.manufactureInfos.items as Array<ManufactureInfo>) || []).map(
                     item => ({
                        value: item.id,
                        label: item.manufacturedAt
                           ? moment(item.manufacturedAt).format('DD-MM-YYYY')
                           : item.id
                     })
                  )}
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
               onClick={form.handleSubmit(handleSaveManufacturer)}
            >
               Save
            </LoadingButton>
         </DialogActions>
      </Dialog>
   )
}

export default ProductCreateEditModal

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { ManufactureInfo, ManufactureInfoPayLoad, Manufacturer, ManufacturerPayLoad } from 'models'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { LoadingButton } from '@mui/lab'
import moment from 'moment'
import { useLazyQuery, useQuery } from '@apollo/client'
import MANUFACTUREINFOS_QUERY from 'graphql/query/manufactureInfos'
import MANUFACTURERS_QUERY from 'graphql/query/manufacturers'

type Props = {
   data?: ManufactureInfo
   isOpen: boolean
   onClose: () => void
   onSubmit: (values: ManufactureInfoPayLoad) => Promise<void>
}

const schema = yup.object().shape({
   manufacturedAt: yup.date().required(),
   manufacturersId: yup.string().required()
})

const ManufacturerInfoCreateEditModal = (props: Props) => {
   const { data, onClose, isOpen, onSubmit } = props

   const { data: options, refetch } = useQuery(MANUFACTURERS_QUERY)

   useEffect(() => {
      if (isOpen) {
         refetch()
      }
   }, [isOpen, refetch])

   const form = useForm<ManufactureInfoPayLoad>({
      defaultValues: new ManufactureInfoPayLoad(),
      resolver: yupResolver(schema)
   })
   const {
      reset,
      control,
      formState: { isSubmitting }
   } = form

   const handleSaveManufacturer = async (values: ManufactureInfoPayLoad) => {
      if (onSubmit) await onSubmit(values)
   }

   useEffect(() => {
      console.log(data)
      if (data && data.id) {
         reset({
            id: data?.id || '',
            manufacturedAt: moment(data?.manufacturedAt || undefined).format('YYYY-MM-DD'),
            manufacturersId: data?.manufacturersId || ''
         })
      } else {
         reset({
            manufacturedAt: moment().format('YYYY-MM-DD'),
            manufacturersId: data?.manufacturersId
         })
      }
   }, [data, reset])

   const handleClose = () => {
      onClose()
      reset()
   }

   return (
      <Dialog open={isOpen} onClose={handleClose} scroll="body">
         <DialogTitle>Th??ng tin s???n xu???t</DialogTitle>
         <DialogContent>
            <form>
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  type="date"
                  name="manufacturedAt"
                  label="Th???i gian s???n xu???t"
               />
               <CustomSelectField
                  disabled={isSubmitting}
                  control={control}
                  name="manufacturersId"
                  label="H??ng s???n xu???t"
                  options={((options?.manufacturers.items as Array<Manufacturer>) || []).map(
                     item => ({ value: item.id, label: item.name })
                  )}
               />
            </form>
         </DialogContent>
         <DialogActions>
            <Button disabled={isSubmitting} onClick={onClose}>
               H???y
            </Button>
            <LoadingButton
               loading={isSubmitting}
               type="submit"
               variant="contained"
               onClick={form.handleSubmit(handleSaveManufacturer)}
            >
               L??u
            </LoadingButton>
         </DialogActions>
      </Dialog>
   )
}

export default ManufacturerInfoCreateEditModal

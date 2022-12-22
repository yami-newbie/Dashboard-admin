import {
   Button,
   Card,
   CardActions,
   CardContent,
   CardHeader,
   DialogActions,
   Divider,
   InputAdornment
} from '@mui/material'
import { TagsInput } from "react-tag-input-component";
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { Category, ProductTypePayload, ProductType } from 'models'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { LoadingButton } from '@mui/lab'
import { useQuery } from '@apollo/client'
import CATEGORIES_QUERY from 'graphql/query/categories'
import { Manufacturer } from 'models/manufacturer'
import MANUFACTURERS_QUERY from 'graphql/query/manufacturers'
import { LoadingBackdrop } from 'components/loading'
import FileUpload from 'components/file-upload/file-upload'
import moment from 'moment'

export interface ProductTypeAddEditModalProps {
   data?: ProductType
   onClose: () => void
   onSubmit: (product: ProductTypePayload, files: FileList | null) => Promise<void>
}

const schema = yup.object({
   id: yup.string(),
   name: yup.string().max(255).required(),
   description: yup.string().required(),
   metaDatas: yup.object({
      seriesName: yup.string().required(),
      manufacturersId: yup.string().required()
   }),
   categoriesIds: yup.array(yup.string()).min(1).required(),
   price: yup.number().integer().moreThan(0),
   tags: yup.array(yup.string()),
   files: yup.array(yup.object())
})

export function ProductTypeAddEditModal({ data, onClose, onSubmit }: ProductTypeAddEditModalProps) {
   const {
      data: categories,
      error: categories_error,
      loading: categories_loading
   } = useQuery(CATEGORIES_QUERY)
   const {
      data: manufacturers,
      error: manufacturers_error,
      loading: manufacturers_loading
   } = useQuery(MANUFACTURERS_QUERY)

   const [categoriesOptions, setCategoriesOptions] = useState<Category[]>([])
   const [manufacturersOptions, setManufacturersOptions] = useState<Manufacturer[]>([])

   const [files, setFiles] = useState<FileList | null>(null)

   useEffect(() => {
      setCategoriesOptions(categories?.categories?.items || [])
   }, [categories])

   useEffect(() => {
      setManufacturersOptions(manufacturers?.manufacturers?.items || [])
   }, [manufacturers])

   const form = useForm<ProductTypePayload>({
      defaultValues: new ProductTypePayload(),
      resolver: yupResolver(schema)
   })
   const {
      reset,
      setValue,
      control,
      formState: { isSubmitting, errors }
   } = form

   const handleSaveProduct = async (values: ProductTypePayload) => {
      if (onSubmit) await onSubmit(values, files)
   }

   useEffect(() => {
      if (data) {
         reset({
            id: data?.id || '',
            name: data?.name || '',
            description: data?.description || '',
            categoriesIds: data?.categories.map(i => i.id) || [],
            warrentyDate: moment(data?.warrentyDate || undefined).format('YYYY-MM-DD'),
            metaDatas: {
               audio: data?.metaDatas?.audio || '',
               battery: data?.metaDatas?.battery || '',
               camera: data?.metaDatas?.camera || '',
               color: data?.metaDatas?.color || '',
               cPUSeries: data?.metaDatas?.cPUSeries || '',
               dimensions: data?.metaDatas?.dimensions || '',
               gPUSeries: data?.metaDatas?.gPUSeries || '',
               hardDrive: data?.metaDatas?.hardDrive || '',
               manufacturersId: data?.metaDatas?.manufacturersId || '',
               operatingSystem: data?.metaDatas?.operatingSystem || '',
               ports: data?.metaDatas?.ports || '',
               publishedDate: moment(data?.metaDatas?.publishedDate || undefined).format('YYYY-MM-DD'),
               ram: data?.metaDatas?.ram || '',
               screenResolution: data?.metaDatas?.screenResolution || '',
               seriesName: data?.metaDatas?.seriesName || '',
               weight: data?.metaDatas?.weight || '',
               wLAN: data?.metaDatas?.wLAN || '',
            },
            price: data?.price || 0,
            tags: data?.tags || [],
         })
         console.log(data);
      } else {
         reset({
            name: '',
            description: '',
            categoriesIds: [],
            warrentyDate: undefined,
            metaDatas: {
               audio: '',
               battery: '',
               camera: '',
               color: '',
               cPUSeries: '',
               dimensions: '',
               gPUSeries: '',
               hardDrive: '',
               manufacturersId: '',
               operatingSystem: '',
               ports: '',
               publishedDate: '',
               ram: '',
               screenResolution: '',
               seriesName: '',
               weight: '',
               wLAN: '',
            },
            price: 0,
            tags: [],
         })
      }
   }, [data, reset])

   const handleClose = () => {
      onClose()
      reset()
   }

   return (
      <Card>
         <LoadingBackdrop open={categories_loading && manufacturers_loading} />

         <CardHeader title={!data ? 'Loại sản phẩm mới' : 'Chỉnh sửa loại sản phẩm'}></CardHeader>

         <Divider />
         <CardContent style={{ width: '100%' }}>
            <form style={{ width: '100%' }}>
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="name"
                  label="Tên loại sản phẩm"
               />
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="description"
                  label="Miêu tả"
                  multiline={true}
                  rows={4}
               />

               <CustomTextField
                  control={control}
                  name="price"
                  type="number"
                  disabled={isSubmitting}
                  label="Price"
                  InputProps={{
                     startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="warrentyDate"
                  type="date"
                  label="Warrenty date"
                  InputLabelProps={{ shrink: true }}
               />

               <FileUpload
                  name='medias'
                  label=""
                  updateFilesCb={setFiles}
                  multiple
                  disabled={isSubmitting}
               />

               {/* <input multiple type="file" onChange={(event) => { setFiles(event.target.files) }}/> */}

               <CustomSelectField
                  control={control}
                  name="categoriesIds"
                  label="Danh mục"
                  multiple={true}
                  disabled={isSubmitting}
                  options={
                     categoriesOptions
                        ? categoriesOptions.map((item: Category) => ({
                             value: item.id,
                             label: item.name
                          }))
                        : []
                  }
               />

               <CustomSelectField
                  control={control}
                  name="metaDatas.manufacturersId"
                  label="Hãng sản xuất"
                  disabled={isSubmitting}
                  options={
                     manufacturersOptions
                        ? manufacturersOptions.map((item: Manufacturer) => ({
                             value: item.id,
                             label: item.name
                          }))
                        : []
                  }
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.seriesName"
                  label="Series của sản phẩm"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.cPUSeries"
                  label="CPU Series"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.gPUSeries"
                  label="Graphic card"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.ram"
                  label="RAM"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.hardDrive"
                  label="Hard drive"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.operatingSystem"
                  label="Operating system"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.publishedDate"
                  type="date"
                  label="Published date"
                  InputLabelProps={{ shrink: true }}
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.weight"
                  label="Weight"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.audio"
                  label="Audio"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.battery"
                  label="Battery"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.camera"
                  label="Camera"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.color"
                  label="Color"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.dimensions"
                  label="Dimensions"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.ports"
                  label="Ports"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.screenResolution"
                  label="Screen resolution"
               />

               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.wLAN"
                  label="Wifi"
               />

               <TagsInput
                  value={data?.tags}
                  onChange={(tags: string[]) => {setValue('tags', tags)}}
                  name="tags"
                  placeHolder="enter tags"
                  disabled={isSubmitting}
               />
            </form>
         </CardContent>
         <DialogActions>
            <Button disabled={isSubmitting} onClick={onClose}>
               Hủy
            </Button>
            <LoadingButton
               loading={isSubmitting}
               type="submit"
               variant="contained"
               onClick={form.handleSubmit(handleSaveProduct)}
            >
               Lưu
            </LoadingButton>
         </DialogActions>
      </Card>
   )
}

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
import { Category, ProductTypePayload, ProductType, Media } from 'models'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { LoadingButton } from '@mui/lab'
import { useQuery, useMutation } from '@apollo/client'
import CATEGORIES_QUERY from 'graphql/query/categories'
import { Manufacturer } from 'models/manufacturer'
import MANUFACTURERS_QUERY from 'graphql/query/manufacturers'
import { LoadingBackdrop } from 'components/loading'
import FileUpload from 'components/file-upload/file-upload'
import moment from 'moment'
import DELETE_MEDIAS from 'graphql/mutation/deleteMedias';

export interface ProductTypeAddEditModalProps {
   data?: ProductType
   onClose: () => void
   onSubmit: (product: ProductTypePayload, medias: Media[]) => Promise<void>
}

const schema = yup.object({
   id: yup.string(),
   name: yup.string().max(255).required(),
   description: yup.string().required(),
   metaDatas: yup.object({
      audio: yup.string(),
      battery: yup.string(),
      camera: yup.string(),
      color: yup.string(),
      cPUSeries: yup.string(),
      dimensions:yup.string(),
      gPUSeries: yup.string(),
      hardDrive: yup.string(),
      manufacturersId: yup.string(),
      operatingSystem: yup.string(),
      ports: yup.string(),
      ram: yup.string(),
      screenResolution: yup.string(),
      seriesName: yup.string(),
      weight: yup.string(),
      wLAN: yup.string(),
      publishedDate: yup.date()
   }),
   categoriesIds: yup.array(yup.string()).min(1).required(),
   price: yup.number().integer().moreThan(0),
   warrantyPeriod: yup.number(),
   tags: yup.array(yup.string()),
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
   const [medias, setMedias] = useState<Media[]>([])
   const [newestmedias, setNewestmedias] = useState<Media[]>([])
   const [isCreate, setIsCreate] = useState<boolean>(true)
   const [deleteMedias] = useMutation(DELETE_MEDIAS)

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
      getValues,
      control,
      formState: { isSubmitting, errors }
   } = form

   const handleSaveProduct = async (values: ProductTypePayload) => {
      if (onSubmit) await onSubmit(values, medias)
   }

   useEffect(() => {
      if (data) {
         console.log(data);
         reset({
            id: data?.id || '',
            name: data?.name || '',
            description: data?.description || '',
            categoriesIds: data?.categories.map(i => i.id) || [],
            warrantyPeriod: data?.warrantyPeriod || 0,
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
         setMedias(data?.medias.map(val => ({
            id: val.id,
            filePath: val.filePath,
            fileSize: val.fileSize,
            fileType: val.fileType,
            createdAt: val.createdAt,
            updatedAt: val.updatedAt
         })));
         setIsCreate(false);
      } else {
         reset({
            name: '',
            description: '',
            categoriesIds: [],
            warrantyPeriod: 0,
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
               publishedDate: undefined,
               ram: '',
               screenResolution: '',
               seriesName: '',
               weight: '',
               wLAN: '',
            },
            price: 0,
            tags: [],
         });
         setIsCreate(true);
      }
   }, [data, reset])

   const handleClose = async () => {
      const imageIds = newestmedias.map((val) => val.id);
      const _mutationResult = await deleteMedias({ variables: { input: { ids: imageIds} } })
      console.log(_mutationResult);
      onClose()
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
                  type="number"
                  disabled={isSubmitting}
                  control={control}
                  label="Thời gian bảo hành"
                  name="warrantyPeriod"
                  // InputLabelProps={{ shrink: true }}
               />

               <CustomTextField
                  type="number"
                  disabled={true}
                  hidden={isCreate}
                  control={control}
                  value={data?.totalAmount}
                  label="Tổng số lượng"
                  name="totalAmount"
                  // InputLabelProps={{ shrink: true }}
               />

               <FileUpload
                  name='medias'
                  label=""
                  value={medias}
                  updateFilesCb={(vals: any) => {
                     setMedias(vals.newFiles as Media[]);
                     setNewestmedias(vals.newestfiles);
                     console.log(vals.newFiles, vals.newestfiles);
                  }}
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

               {/* <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="metaDatas.publishedDate"
                  type="date"
                  label="Published date"
                  InputLabelProps={{ shrink: true }}
               /> */}

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
            <Button disabled={isSubmitting} onClick={handleClose}>
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

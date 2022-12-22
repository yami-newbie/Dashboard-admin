import { forwardRef, memo, useEffect, useRef, useState } from 'react'
import { Media } from 'models'
import styled from '@emotion/styled'
import { Box, Button, Card, IconButton, Typography } from '@mui/material'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Image from 'next/image'
import { Stack, width } from '@mui/system'
import CloseIcon from 'assets/icons/close'
import { useLazyQuery, useMutation } from '@apollo/client'
import UPLOAD_MEDIAS from 'graphql/mutation/uploadMedias'
import DELETE_MEDIAS from 'graphql/mutation/deleteMedias';

const FormField = styled.input`
   font-size: 18px;
   display: block;
   width: 100%;
   border: none;
   text-transform: none;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   opacity: 0;

   &:focus {
      outline: none;
   }
`

const MEGA_BYTES_PER_BYTE = 1024 * 1024
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 100 * MEGA_BYTES_PER_BYTE

const convertNestedObjectToArray = nestedObj => Object.keys(nestedObj).map(key => nestedObj[key])

const FilePreviewCard = memo(({ index, file, onRemove }) => {
   console.log('re-render')
   return (
      <Draggable draggableId={file.id} index={index}>
         {(provided, snapshot) => (
            <Box
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               sx={{ marginBottom: 2 }}
            >
               <Card
                  sx={{
                     minHeight: '50px',
                     width: '100%',
                     padding: '10px',
                     cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                     // ...provided.draggableProps.style
                  }}
               >
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                     }}
                  >
                     <Stack direction={'row'} alignItems="center" spacing={2}>
                        <Box sx={{ position: 'relative', minHeight: 100, minWidth: 150 }}>
                           <Image
                              alt={file.id}
                              loader={() => file.filePath}
                              src={file.filePath}
                              style={{
                                 borderRadius: 6,
                                 width: '100%',
                                 maxHeight: '100%',
                                 objectFit: 'cover'
                              }}
                              layout="fill"
                           />
                        </Box>
                        <Typography>{file.name === '' ? 'Untitled' : file.name}</Typography>
                     </Stack>

                     <IconButton color="default" onClick={onRemove}>
                        <CloseIcon width={24} height={24} />
                     </IconButton>
                  </Box>
               </Card>
            </Box>
         )}
      </Draggable>
   )
})

const FileUpload = ({
   label = "",
   updateFilesCb,
   value,
   multiple = true,
   maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
   ...otherProps
}) => {
   const fileInputField = useRef(null)
   const [files, setFiles] = useState(value)
   const [newestfiles, setNewestfiles] = useState([])
   const [uploadMedias] = useMutation(UPLOAD_MEDIAS)
   const [deleteMedias] = useMutation(DELETE_MEDIAS)

   useEffect(() => {
      if(value) {
         setFiles(value);
      }
      else {
         setFiles([]);
      }
   }, [value, setFiles])

   const handleUploadBtnClick = () => {
      fileInputField.current.click()
   }

   const addNewFiles = async newFiles => {
      const acceptedFiles = newFiles.filter(file =>
         file.size <= maxFileSizeInBytes ? true : false
      )
      // upload file to server
      const _mutationResult = await uploadMedias({ variables: { input: { files: acceptedFiles} } })
      const medias = _mutationResult?.data?.uploadMedias?.medias.map(val => ({
         id: val.id,
         filePath: val.filePath,
         fileSize: val.fileSize,
         fileType: val.fileType,
         createdAt: val.createdAt,
         updatedAt: val.updatedAt
      }));
      console.log(medias);

      const updatedFiles = files.concat(medias);
      const updatedNewestfile = newestfiles.concat(medias);
      setNewestfiles(updatedNewestfile);

      if (!multiple) {
         return [updatedFiles[0]]
      }

      return updatedFiles
   }

   const handleNewFileUpload = async e => {
      const { files: newFiles } = e.target

      if (newFiles.length) {
         const filesAsArray = convertNestedObjectToArray(newFiles)

         let updatedFiles = await addNewFiles(filesAsArray)
         updateFiles(updatedFiles)
      }
   }

   const updateFiles = newFiles => {
      setFiles(newFiles)
      updateFilesCb({newFiles: newFiles, newestfiles: newestfiles});
   }

   const removeFile = index => async () => {
      if (index < files.length) {
         const deletedFileId = files[index].id;
         const newFiles = [...files]
         const newNewestFiles = [...newestfiles]
         await deleteMedias({ variables: { input: { ids: [newFiles[index].id]} } })

         newFiles.splice(index, 1)
         const deletedFileIndex =  newNewestFiles.findIndex(val => val.id == deletedFileId);
         if(deletedFileIndex) {
            newNewestFiles.splice(deletedFileIndex,1);
            setNewestfiles(newNewestFiles);
         }
         updateFiles(newFiles)
      }
   }

   const onDragEnd = async ({ source, destination }) => {
      if (!destination) return

      const fromIndex = source.index
      const toIndex = destination.index

      const updatedFiles = [...files]
      const element = updatedFiles.splice(fromIndex, 1)[0]

      updatedFiles.splice(toIndex, 0, element)
      updateFiles(updatedFiles)
   }

   return (
      <>
         <Box
            sx={{
               position: 'relative',
               margin: '25px 0 15px',
               border: '1px dashed lightgray',
               padding: '35px 20px',
               borderRadius: 2,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center'
            }}
         >
            <Typography
               sx={{
                  top: -25,
                  color: 'black',
                  left: 0,
                  position: 'absolute'
               }}
            >
               {label}
            </Typography>
            <Typography sx={{ fontWeight: '500', marginTop: 0, textAlign: 'center' }}>
               Kéo và thả tệp của bạn vào bất cứ đâu hoặc
            </Typography>
            <Button onClick={handleUploadBtnClick}>Tải lên</Button>
            <FormField
               type="file"
               ref={fileInputField}
               onChange={handleNewFileUpload}
               title=""
               value=""
               multiple={multiple}
               {...otherProps}
            />
         </Box>

         <DragDropContext onDragEnd={onDragEnd}>
            <Droppable direction="vertical" droppableId={'file-upload'}>
               {provided => (
                  <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ width: '100%' }}>
                     {files.map((file, index) => {
                        let isImageFile = file?.fileType.split('/')[0] === 'image'

                        return (
                           <FilePreviewCard
                              key={file.name + '___' + index}
                              index={index}
                              file={file}
                              onRemove={removeFile(index)}
                           />
                        )
                     })}
                     {provided.placeholder}
                  </Box>
               )}
            </Droppable>
         </DragDropContext>
      </>
   )
}

export default FileUpload

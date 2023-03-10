import { gql } from 'graphql-tag'

const UPLOAD_MEDIAS = gql`
   mutation ($input: UploadMediasInput!) {
      uploadMedias(input: $input) {
         medias {
            id
            filePath
            fileType
            fileSize
            createdAt
            updatedAt
         }
      }
   }
`

export default UPLOAD_MEDIAS

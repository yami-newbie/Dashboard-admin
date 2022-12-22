import { gql } from 'graphql-tag'

const DELETE_MEDIAS = gql`
   mutation ($input: DeleteMediasInput!) {
      deleteMedias(input: $input) {
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

export default DELETE_MEDIAS

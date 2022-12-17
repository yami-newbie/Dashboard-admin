import { gql } from 'graphql-tag';


const UPLOAD_MEDIAS = gql`
mutation($input: UploadMediasInput!){
   uploadMedias(input: $input) {
     medias {
       id
       filePath
       fileName
       fileSize
     }
   }
 }
`

export default UPLOAD_MEDIAS
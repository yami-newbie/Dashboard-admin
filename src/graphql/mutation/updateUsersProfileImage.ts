import { gql } from 'graphql-tag';


const UPDATE_USER_PROFILE_IMAGE = gql`
mutation($input: UpdateUsersProfileImageInput!){
   updateUsersProfileImage(input: $input) {
     users {
       medias {
         id
         filePath
       }
     }
   }
 }
`

export default UPDATE_USER_PROFILE_IMAGE
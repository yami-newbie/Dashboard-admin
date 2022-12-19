import { gql } from 'graphql-tag'

const UPDATE_USER = gql`
mutation($input: UpdateUserAdminInput!){
   updateUserAdmin(input: $input) {
     users {
      id
      roles {
         id
         name
         description
      }
      medias {
         id
         filePath
      }
      rolesId
      mediasId
      fullname
      dob
      email
      phone
      status
      createdAt
      updatedAt
      deletedAt
     }
   }
 }
`

export default UPDATE_USER

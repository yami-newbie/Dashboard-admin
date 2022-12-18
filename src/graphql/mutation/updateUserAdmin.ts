import { gql } from 'graphql-tag'

const UPDATE_USER = gql`
   mutation ($input: UpdateUsersAdminInput!) {
      updateUsersAdmin(input: $input) {
         users {
            id
         }
      }
   }
`

export default UPDATE_USER

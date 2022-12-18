import { gql } from 'graphql-tag'

const USERS_QUERY = gql`
   query ($input: UserFilterInput, $skip: Int, $take: Int) {
      users(input: $input, skip: $skip, take: $take) {
         totalCount
         pageInfo {
            hasNextPage
            hasPreviousPage
         }
         items {
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

export default USERS_QUERY

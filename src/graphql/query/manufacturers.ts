import { gql } from 'graphql-tag'

const MANUFACTURERS_QUERY = gql`
   query (
      $input: ManufacturersFilterInput, $skip: Int, $take: Int
   ) {
      manufacturers(input: $input, skip: $skip, take: $take) {
         items {
            id
            name
            description
            address
            medias {
               id
               filePath
            }
            deletedAt
            createdAt
            updatedAt
         }
         pageInfo {
            hasNextPage
            hasPreviousPage
         }
         totalCount
      }
   }
`

export default MANUFACTURERS_QUERY

import { gql } from 'graphql-tag'

const PRODUCT_QUERY = gql`
   query ($input: ProductsFilterInput, $skip: Int, $take: Int) {
      products(input: $input, skip: $skip, take: $take) {
         totalCount
         pageInfo {
            hasNextPage
            hasPreviousPage
         }
         items {
            id
            manufactureInfos {
               id
               manufacturedAt
               manufacturersId
               manufacturers {
                  id
                  name
                  description
                  address
                  medias {
                     id
                     filePath
                  }
               }
            }
            productTypes {
               id
            }
         }
      }
   }
`

export default PRODUCT_QUERY

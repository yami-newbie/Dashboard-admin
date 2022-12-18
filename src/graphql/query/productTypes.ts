import { gql } from 'graphql-tag'
import { FilterInput } from 'models'

const PRODUCT_TYPE = gql`
   query (
      $input: ProductTypesFilterInput, $skip: Int, $take: Int
   ) {
      productTypes(input: $input, skip: $skip, take: $take) {
         items {
            id
            name
            description
            price
            categories {
               id
               name
               description
            }
            createdAt
            warrentyDate
            medias {
               id
               filePath
               fileType
               fileSize
            }
            metaDatas {
               id
               seriesName
               manufacturers {
                  id
                  name
               }
               manufacturersId
            }
         }
         pageInfo {
            hasNextPage
            hasPreviousPage
         }
         totalCount
      }
   }
`

export default PRODUCT_TYPE

export interface ProductTypesFilterInput extends FilterInput {
   categoriesIds?: string[]
   createFrom?: string
   createTo?: string
   descriptions?: string
   ids?: string
   isDelete?: boolean
   names?: string
   priceFrom?: number
   proceTo?: number
   updateFrom?: string
   updateTo?: string
   warrentyDateFrom?: string
   warrentyDateTo?: string
}

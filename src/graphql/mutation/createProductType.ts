import { gql } from 'graphql-tag'

const CREATE_PRODUCT_TYPE = gql`
   mutation ($input: CreateProductTypeInput, $files: [Upload!]) {
      createProductType(input: $input, files: $files) {
         productTypes {
            id
            name
            description
            price
            categories {
               id
            }
            metaDatas {
               id
               seriesName
               manufacturers {
                  id
                  name
               }
            }
         }
      }
   }
`

export default CREATE_PRODUCT_TYPE

import { gql } from 'graphql-tag'

const UPDATE_PRODUCT_TYPE = gql`
   mutation ($input: UpdateProductTypeInput, $medias: [MediasInput!]) {
      updateProductType(input: $input, medias: $medias) {
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
            },
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
   }
`

export default UPDATE_PRODUCT_TYPE

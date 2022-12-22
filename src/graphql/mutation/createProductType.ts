import { gql } from 'graphql-tag'

const CREATE_PRODUCT_TYPE = gql`
   mutation ($input: CreateProductTypeInput, $medias: [MediasInput!]) {
      createProductType(input: $input, medias: $medias) {
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

export default CREATE_PRODUCT_TYPE

import { gql } from 'graphql-tag'

const CREATE_PRODUCT_TYPE = gql`
   mutation ($input: CreateProductTypeInput, $mediasIds: [UUID!]) {
      createProductType(input: $input, mediasIds: $mediasIds) {
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
            tags {
               id
               name
            }
            totalAmount
         }
      }
   }
`

export default CREATE_PRODUCT_TYPE

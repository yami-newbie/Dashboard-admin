import { gql } from 'graphql-tag'

const UPDATE_PRODUCT_TYPE = gql`
   mutation ($input: UpdateProductTypeInput, $mediasIds: [UUID!]) {
      updateProductType(input: $input, mediasIds: $mediasIds) {
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

export default UPDATE_PRODUCT_TYPE

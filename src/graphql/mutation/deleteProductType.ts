import { gql } from 'graphql-tag'

const DELETE_PRODUCT_TYPE = gql`
   mutation ($input: DeleteProductTypeInput!) {
      deleteProductType(input: $input) {
         productTypes {
            id
         }
      }
   }
`

export default DELETE_PRODUCT_TYPE

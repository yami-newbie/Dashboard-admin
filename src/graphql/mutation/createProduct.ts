import { gql } from 'graphql-tag'

const CREATE_PRODUCT = gql`
   mutation ($input: CreateProductInput!) {
      createProduct(input: $input) {
         products {
            id
            productTypes {
               id
               name
            }
         }
      }
   }
`

export default CREATE_PRODUCT

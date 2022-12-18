import { gql } from 'graphql-tag'

const CARTS_QUERY = gql`
   query ($input: CartsFilterInput) {
      carts(input: $input) {
         pageInfo {
            hasNextPage
            hasPreviousPage
         }
         totalCount
         items {
            id
            users {
               id
               roles {
                  id
                  name
               }
               mediasId
               fullname
            }
            cartItems {
               id
               cartsId
               products {
                  id
               }
               amount
            }
         }
      }
   }
`

export default CARTS_QUERY

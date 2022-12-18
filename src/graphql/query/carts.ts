import { gql } from 'graphql-tag';

const CARTS_QUERY = gql`
query($input: CartsFilterInput, $after: String, $before: String, $first: Int, $last: Int) {
   carts(input: $input, after: $after, before: $before, first: $first, last: $last) {
     pageInfo {
       hasNextPage
       hasPreviousPage
       startCursor
       endCursor
     }
     totalCount
     edges{
       cursor
       node {
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
 }`


export default CARTS_QUERY
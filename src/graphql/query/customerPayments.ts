import { gql } from 'graphql-tag';


const CUSTOMER_PAYMENT_QUERY = gql`
query($input: CustomerPaymentsFilterInput, $after: String, $before: String, $first: Int, $last: Int){
   customerPayments(input: $input, after: $after, before: $before, first: $first, last: $last) {
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
         address
         paymentMethodsId
         paymentMethods {
           id
         }
         userId
         users {
           id
         }
         deletedAt
         createdAt
         updatedAt        
       }
     }
   }
 }
`

export default CUSTOMER_PAYMENT_QUERY
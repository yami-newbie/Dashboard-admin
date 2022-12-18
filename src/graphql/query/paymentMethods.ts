import { gql } from 'graphql-tag';


const PAYMENT_METHODS_QUERY = gql`
query($input: PaymentMethodsFilterInput, $after: String, $before: String, $first: Int, $last: Int){
   paymentMethods(input: $input, after: $after, before: $before, first: $first, last: $last) {
     pageInfo {
       hasNextPage
       hasPreviousPage
       startCursor
       endCursor
     }
     totalCount
     nodes {
       id
       name
       description
       currency
       deletedAt
       createdAt
       updatedAt        
     }
   }
 }
`

export default PAYMENT_METHODS_QUERY

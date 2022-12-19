import { gql } from 'graphql-tag';


const ORDERS_QUERY = gql`
query($input: OrdersFilterInput, $skip: Int, $take: Int){
   orders(input: $input, skip: $skip, take: $take){
     totalCount
     pageInfo {
       hasNextPage
       hasPreviousPage
     }
     items {
       id
       status
       addressFrom
       addressTo
       receiptsId
       createdAt
       updatedAt
       deletedAt
     }
   }
 }
`

export default ORDERS_QUERY
import { gql } from 'graphql-tag'

const CUSTOMER_PAYMENT_QUERY = gql`
   query (
      $input: CustomerPaymentsFilterInput, $skip: Int, $take: Int
   ) {
      customerPayments(input: $input, skip: $skip, take: $take) {
         pageInfo {
            hasNextPage
            hasPreviousPage
         }
         totalCount
         items {
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
`

export default CUSTOMER_PAYMENT_QUERY

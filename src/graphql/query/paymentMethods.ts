import { gql } from 'graphql-tag'

const PAYMENT_METHODS_QUERY = gql`
   query (
      $input: PaymentMethodsFilterInput, $skip: Int, $take: Int
   ) {
      paymentMethods(input: $input, skip: $skip, take: $take) {
         pageInfo {
            hasNextPage
            hasPreviousPage
         }
         totalCount
         items {
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

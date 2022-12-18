import { gql } from 'graphql-tag'

const UPDATE_PAYMENT_METHOD = gql`
   mutation ($input: UpdatePaymentMethodInput) {
      updatePaymentMethod(input: $input) {
         paymentMethods {
            id
            name
            description
            currency
         }
      }
   }
`

export default UPDATE_PAYMENT_METHOD

import { gql } from 'graphql-tag';

const DELETE_PAYMENT_METHOD = gql`
mutation($input: DeletePaymentMethodInput!){
   deletePaymentMethod(input: $input) {
     paymentMethods {
       id
     }
   }
 }
`

export default DELETE_PAYMENT_METHOD
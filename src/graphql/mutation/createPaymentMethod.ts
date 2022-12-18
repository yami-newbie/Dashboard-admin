import { gql } from 'graphql-tag';

const CREATE_PAYMENT_METHOD = gql`
mutation($input: CreatePaymentMethodInput){
   createPaymentMethod(input: $input) {
     paymentMethods {
       id
       name
       description
       currency
     }
   }
 }
`

export default CREATE_PAYMENT_METHOD
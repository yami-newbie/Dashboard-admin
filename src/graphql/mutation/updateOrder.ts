import { gql } from 'graphql-tag'

const UPDATE_ORDER = gql`
   mutation ($input: UpdateOrderInput) {
      updateOrder(input: $input) {
         orders {
            id
            status
            addressFrom
            addressTo
            receipts {
             totalPrice
             receiptDetails {
               id
               productsId
             }
             payments {
               id
               customerPayments {
                 id
                 paymentMethods {
                   id
                   currency
                   name
                 }
               }
             }
            }
            receiptsId
            users {
             id
             fullname
             medias {
               id
               filePath
               fileSize
               fileType
             }
            }
            createdAt
            updatedAt
            deletedAt
         }
      }
   }
`

export default UPDATE_ORDER

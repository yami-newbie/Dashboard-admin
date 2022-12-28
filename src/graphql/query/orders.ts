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

export default ORDERS_QUERY
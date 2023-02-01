import { gql } from 'graphql-tag'

const STATISTIC_QUERY = gql`
   query{
      users{
         totalCount
      }
      productTypes(take: 5, order: { createdAt: DESC }){
         totalCount
         items {
            id
            name
            description
            medias {
               filePath
            }
            createdAt
            updatedAt
         }
      }
      orders(take: 5, order: { createdAt: DESC }) {
         items {
            id
            status
            addressFrom
            addressTo
            receiptsId
            createdAt
            updatedAt
            deletedAt
            users {
               id
               fullname
            }
            receipts {
               id
               hashed
               totalPrice
               vATPercentage
            payments {
               id
               paymentTotal
               customerPayments {
                  id
                  address
               }
             }
            receiptDetails {
               id
               price
               amount
            }
           }
         }
         totalCount
      }
   }
`

export default STATISTIC_QUERY

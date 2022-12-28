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
          paymentTotal
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
          price
          amount
          price
          amount
          price
          amount
         products {
            id
           manufactureInfos {
              id
              manufacturedAt
             manufacturers {
                id
                name
              }
            }
           productTypes {
              id
              name
              description
              price
             categories {
                id
                name
              }
             medias {
                id
                filePath
              }
             metaDatas {
                id
                operatingSystem
                ports
                audio
                camera
                weight
                dimensions
               manufacturers {
                  id
                  name
                }
                publishedDate
                color
                cPUSeries
                gPUSeries
                ram
                screenResolution
                hardDrive
                battery
                wLAN
              }
            }
          }
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
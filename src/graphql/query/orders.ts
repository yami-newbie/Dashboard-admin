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
           users {
              id
            }
           paymentMethods {
              id
              name
              description
              currency
            }
          }
        }
       receiptDetails {
          id
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
    }
  }
}
`

export default ORDERS_QUERY
import { gql } from 'graphql-tag'

const CREATE_MANUFACTURE_INFO = gql`
   mutation ($input: CreateManufactureInfoInput) {
      createManufactureInfo(input: $input) {
         manufactureInfos {
            id
            manufacturersId
            manufacturedAt
            manufacturers {
               id
               name
               description
               address
               medias {
                  id
                  filePath
               }
               createdAt
               updatedAt
            }
            createdAt
            updatedAt
         }
      }
   }
`

export default CREATE_MANUFACTURE_INFO

import { gql } from 'graphql-tag'

const MANUFACTUREINFOS_QUERY = gql`
   query ($input: ManufactureInfosFilterInput, $skip: Int, $take: Int) {
      manufactureInfos(input: $input, skip: $skip, take: $take) {
         totalCount
         items {
            id
            manufacturersId
            manufacturedAt
            manufacturers {
               id
               name
            }
            createdAt
            updatedAt
         }
      }
   }
`
export default MANUFACTUREINFOS_QUERY

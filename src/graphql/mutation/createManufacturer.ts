import { gql } from 'graphql-tag'

const CREATE_MANUFACTURER = gql`
   mutation ($input: CreateManufacturerInput!) {
      createManufacturer(input: $input) {
         manufacturers {
            id
            name
         }
      }
   }
`

export default CREATE_MANUFACTURER

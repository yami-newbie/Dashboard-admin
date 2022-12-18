import { gql } from 'graphql-tag'

const UPDATE_MANUFACTURER = gql`
   mutation ($input: UpdateManufacturerInput!) {
      updateManufacturer(input: $input) {
         manufacturers {
            id
            name
         }
      }
   }
`

export default UPDATE_MANUFACTURER

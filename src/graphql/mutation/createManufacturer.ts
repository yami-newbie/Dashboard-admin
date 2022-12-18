import { gql } from 'graphql-tag'

const CREATE_MANUFACTURER = gql`
   mutation ($input: CreateManufacturerInput!, $files: [Upload!]) {
      createManufacturer(input: $input, files: $files) {
         manufacturers {
            id
            name
         }
      }
   }
`

export default CREATE_MANUFACTURER

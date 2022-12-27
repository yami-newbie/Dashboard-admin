import { gql } from 'graphql-tag'

const CREATE_MANUFACTURER = gql`
   mutation ($input: CreateManufacturerInput!, $medias: [MediasInput!]) {
      createManufacturer(input: $input, medias: $medias) {
         manufacturers {
            id
            name
         }
      }
   }
`

export default CREATE_MANUFACTURER

import { gql } from 'graphql-tag';


const DELETE_MANUFACTURER = gql`
mutation($input: DeleteManufacturerInput!){
  deleteManufacturer(input: $input) {
   manufacturers {
      id
    }
  }
}
`

export default DELETE_MANUFACTURER
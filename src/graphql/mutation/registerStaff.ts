import { gql } from 'graphql-tag';


const REGISTER_STAFF = gql`
mutation($input: RegisterStaffInput){
  registerStaff(input: $input) {
    string
  }
}
`

export default REGISTER_STAFF
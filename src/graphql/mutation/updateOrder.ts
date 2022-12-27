import { gql } from 'graphql-tag';


const UPDATE_ORDER = gql`
mutation($input: UpdateOrderInput){
  updateOrder(input: $input) {
    orders {
      id
      status
    }
  }
}
`

export default UPDATE_ORDER
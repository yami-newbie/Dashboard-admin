import { gql } from 'graphql-tag';


const CANCEL_ORDER = gql`
mutation($input: CancelOrderInput!){
  cancelOrder(input: $input) {
    orders {
      id
    }
  }
}
`

export default CANCEL_ORDER
import { gql } from 'graphql-tag';


const DELETE_ORDER = gql`
mutation($input: DeleteOrderInput!){
    deleteOrder(input: $input) {
      orders {
        id
      }
    }
}
`

export default DELETE_ORDER
import { gql } from 'graphql-tag'

const ROLES_QUERY = gql`
   query {
      roles {
         items {
            id
            name
            description
         }
      }
   }
`

export default ROLES_QUERY

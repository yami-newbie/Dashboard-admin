import { gql } from 'graphql-tag';


const ROLES_QUERY = gql`
query{
   roles {
     nodes {
       id
       name
     }
   }
 }
`

export default ROLES_QUERY
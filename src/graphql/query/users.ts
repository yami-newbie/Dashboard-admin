import { gql } from 'graphql-tag';


const USERS_QUERY = gql`
query{
   users {
     pageInfo {
       hasNextPage
       hasPreviousPage
       startCursor
       endCursor 
     }
     edges{
       cursor
       node {
         id
       }
     }
     nodes {
       id
       roles {
         id
         name
         description
       }
       rolesId
       mediasId
       fullname
       dob
       email
       phone
       status
     }
     totalCount
   }
 }
`

export default USERS_QUERY
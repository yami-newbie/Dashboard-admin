import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql(`
query{
   currentUsers {
      id
      email
   }
 }
`);


export default CURRENT_USER_QUERY
import gql from "graphql-tag";

const LOGIN_QUERY = gql(`
   query ($input: UserAuthenticationInput) {
      login(input: $input)
   }
`);


export default LOGIN_QUERY
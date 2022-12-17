import gql from "graphql-tag";

const LOGIN_QUERY = gql(`
   query ($input: UserAuthenticationInput) {
      login(input: $input){
         expireAt
         accessToken
         refreshToken
         email
         status
      }
   }
`);


export default LOGIN_QUERY
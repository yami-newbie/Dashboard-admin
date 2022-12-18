import { gql } from 'graphql-tag';


const USERS_QUERY = gql`
query($input: UserFilterInput){
  users(input: $input) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor 
    }
    nodes {
      id
      roles {
        id
        name
        description
      }
      medias{
        id
        filePath
      }
      rolesId
      mediasId
      fullname
      dob
      email
      phone
      status
      createdAt
      updatedAt
      deletedAt
    }
  }
}
`

export default USERS_QUERY
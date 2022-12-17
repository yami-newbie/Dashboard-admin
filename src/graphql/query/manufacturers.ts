import { gql } from 'graphql-tag';


const MANUFACTURERS_QUERY = gql`
query($input: ManufacturersFilterInput, $after: String, $before: String, $first: Int, $last: Int){
   manufacturers (input: $input, after: $after, before: $before, first: $first, last: $last){
    nodes{
      id
      name
      description
      address
      medias {
        id
        filePath
      }
      deletedAt
      createdAt
      updatedAt
     }
     pageInfo {
       hasNextPage
       hasPreviousPage
       startCursor
       endCursor
     }
     totalCount
   }
 }
 `

export default MANUFACTURERS_QUERY
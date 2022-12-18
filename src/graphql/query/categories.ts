import { gql } from 'graphql-tag';


const CATEGORIES_QUERY =  gql`
query($input: CategoriesFilterInput, $after: String, $before: String, $first: Int, $last: Int){
  categories(input: $input, after: $after, before: $before, first: $first, last: $last){
    edges{
      cursor
      node {
        id
        name
        description
      }
    }
    nodes {
      id
      name
      description
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

export default CATEGORIES_QUERY
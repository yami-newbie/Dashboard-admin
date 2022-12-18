import { gql } from 'graphql-tag'

const CATEGORIES_QUERY = gql`
   query ($input: CategoriesFilterInput, $skip: Int, $take: Int) {
      categories(input: $input, skip: $skip, take: $take) {
         items {
            id
            name
            description
         }
         pageInfo {
            hasNextPage
            hasPreviousPage
         }
         totalCount
      }
   }
`

export default CATEGORIES_QUERY

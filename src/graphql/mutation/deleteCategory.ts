import { gql } from 'graphql-tag'

const DELETE_CATEGORY = gql`
   mutation ($input: DeleteCategoryInput!) {
      deleteCategory(input: $input) {
         categories {
            id
         }
      }
   }
`

export default DELETE_CATEGORY

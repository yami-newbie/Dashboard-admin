import { gql } from 'graphql-tag'

const CREATE_CATEGORY = gql`
   mutation ($input: CreateCategoryInput) {
      createCategory(input: $input) {
         categories {
            id
            name
            description
            deletedAt
            createdAt
            updatedAt
         }
      }
   }
`

export default CREATE_CATEGORY

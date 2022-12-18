import { gql } from 'graphql-tag';


const UPDATE_CATEGORY = gql`
mutation($input: UpdateCategoryInput){
   updateCategory(input: $input) {
     categories {
       id
       name
       description
       deletedAt
       createdAt
       updatedAt
     }
   }
 }`

export default UPDATE_CATEGORY
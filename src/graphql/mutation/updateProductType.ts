import { gql } from 'graphql-tag';


const UPDATE_PRODUCT_TYPE = gql`
mutation($input: UpdateProductTypeInput, $files: [Upload!]){
   updateProductType(input: $input, files: $files){
     productTypes {
       id
       name
       description
       price
       categories {
         id
       }
       metaDatas {
         id
         seriesName
         manufacturers {
           id
           name
         }
       }
     }
   }
 }
`

export default UPDATE_PRODUCT_TYPE
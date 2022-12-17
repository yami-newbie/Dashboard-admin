import { gql } from 'graphql-tag';


const PRODUCT_QUERY = gql`
query($input: ProductsFilterInput){
   products(input: $input) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
     nodes {
       id
       manufactureInfos {
         id
         manufacturedAt
         manufacturersId
         manufacturers {
           id
           name
           description
           address
           medias {
             id
             filePath
           }
         }
       }
       productTypes {
         id
       }
     }
   }
 }`

export default PRODUCT_QUERY
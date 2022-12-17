import { gql } from 'graphql-tag';

const MANUFACTUREINFOS_QUERY = gql`
query($input: ManufactureInfosFilterInput){
   manufactureInfos(input: $input) {
     totalCount
     nodes {
       id
       manufacturersId
       manufacturedAt
       manufacturers {
         id
         name
       }
       createdAt
       updatedAt
     }
   }
 }
`
export default MANUFACTUREINFOS_QUERY
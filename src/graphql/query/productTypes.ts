import { gql } from 'graphql-tag';
import { FilterInput } from 'models';

const PRODUCT_TYPE = gql`
query($input: ProductTypesFilterInput, $after: String, $before: String, $first: Int, $last: Int){
  productTypes(input: $input, after: $after, before: $before, first: $first, last: $last){
    edges{
      cursor
      node {
        id
        name
        description
        price
        categories {
          id
          name
          description 
        }
        createdAt
        warrentyDate
        medias {
          id
          filePath
          fileType
          fileSize 
        }
        metaDatas {
          id
          seriesName
          manufacturers {
            id
            name
          }
          manufacturersId
        }
      }
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

export default PRODUCT_TYPE

export interface ProductTypesFilterInput extends FilterInput {
  categoriesIds?: string[],
  createFrom?: string,
  createTo?: string,
  descriptions?: string,
  ids?: string,
  isDelete?: boolean,
  names?: string,
  priceFrom?: number,
  proceTo?: number,
  updateFrom?: string,
  updateTo?: string,
  warrentyDateFrom?: string,
  warrentyDateTo?: string
}
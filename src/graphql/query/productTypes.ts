import { gql } from 'graphql-tag'
import { FilterInput } from 'models'

const PRODUCT_TYPE = gql`
   query (
      $input: ProductTypesFilterInput, $skip: Int, $take: Int
   ) {
      productTypes(input: $input, skip: $skip, take: $take) {
         items {
            id,
				name,
				description,
				medias {
					id,
					filePath,
					fileSize,
					fileType,
					createdAt,
					updatedAt
				},
				categories {
					id,
					name,
					description,
					deletedAt
				},
				metaDatas {
					id,
					audio,
					battery,
					camera,
					color,
					cPUSeries,
					dimensions,
					gPUSeries,
					hardDrive,
					manufacturersId
					manufacturers {
						id,
						address,
						description,
						name
					},
					operatingSystem,
					ports,
					publishedDate,
					ram,
					screenResolution,
					seriesName,
					weight,
					wLAN
				},
				price,
				warrantyPeriod,
         }
         pageInfo {
            hasNextPage
            hasPreviousPage
         }
         totalCount
      }
   }
`

export default PRODUCT_TYPE

export interface ProductTypesFilterInput extends FilterInput {
   categoriesIds?: string[]
   createFrom?: string
   createTo?: string
   descriptions?: string
   ids?: string
   isDelete?: boolean
   names?: string
   priceFrom?: number
   proceTo?: number
   updateFrom?: string
   updateTo?: string
   warrentyDateFrom?: string
   warrentyDateTo?: string
}

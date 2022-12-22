import { ManufactureInfo } from './manufacturer'
import { Category } from './category'
import { Media } from './media'
import { MetaData, MetaDataPayLoad } from './metadata'

export class Product {
   constructor(
      public id: string = '',
      public manufactureInfosId: string = '',
      public manufactureInfos: ManufactureInfo = new ManufactureInfo(),
      public deletedAt: string = '',
      public updatedAt: string = '',
      public productTypesId: string = '',
      public productTypes: ProductType = new ProductType()
   ) {}
}

export class ProductPayLoad {
   constructor(
      public id: string | null = null,
      public manufactureInfosId: string = '',
      public productTypesId: string = ''
   ) {}
}
export class ProductTypePayload {
   constructor(
      public id: string = '',
      public name: string = '',
      public description: string = '',
      public categoriesIds: string[] = [],
      public price: number = 0,
      public warrantyPeriod: number = 0,
      public metaDatas: MetaDataPayLoad = new MetaDataPayLoad(),
      public tags: string[] = [],
   ) {}
}

export interface ProductQueryParams extends Record<keyof Product, string> {
   orderBy?: string
   search?: string
}

export class ProductType {
   constructor(
      public id: string = "",
      public name: string = '',
      public description: string = '',
      public price: number = 0,
      public categories: Category[] = [],
      public warrantyPeriod: number = 0,
      public metaDatas: MetaData = new MetaData(),
      public deletedAt: string = '',
      public createdAt: string = '',
      public updatedAt: string = '',
      public medias: Media[] = [],
      public tags: string[] = [],
   ) {}
}

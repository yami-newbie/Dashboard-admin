import { Media } from './media'

export class Manufacturer {
   constructor(
      public id: string = '',
      public name: string = '',
      public description: string = '',
      public address: string = '',
      public createAt: string = '',
      public deleteAt: string = '',
      public medias: Media[] = [],
      public updateAt: string = ''
   ) {}
}

export class ManufacturerPayLoad {
   constructor(
      public address: string = '',
      public description: string = '',
      public id: string | null = null,
      public name: string = ''
   ) {}
}

export class ManufactureInfo {
   constructor(
      public id: string = '',
      public createdAt: string = '',
      public updatedAt: string = '',
      public manufacturedAt: string = '',
      public manufacturersId: string = '',
      public manufacturers: Manufacturer = new Manufacturer()
   ) {}
}

export class ManufactureInfoPayLoad {
   constructor(
      public id: string | null = null,
      public manufacturedAt: string = '',
      public manufacturersId: string = ''
   ) {}
}

import { Manufacturer } from './manufacturer'

export interface MetaData {
   audio?: string
   battery?: string
   camera?: string
   color?: string
   cPUSeries?: string
   dimensions?: string
   gPUSeries?: string
   hardDrive?: string
   id: string
   manufacturers?: Manufacturer[]
   manufacturersId: string
   operatingSystem?: string
   ports?: string
   publishedDate?: string
   ram?: string
   screenResolution?: string
   seriesName: string
   weight?: string
   wLAN?: string
}

export class MetaDataPayLoad {
   constructor(
      public audio: string = '',
      public battery: string = '',
      public camera: string = '',
      public color: string = '',
      public cPUSeries: string = '',
      public dimensions: string = '',
      public gPUSeries: string = '',
      public hardDrive: string = '',
      public id: string = '',
      public manufacturers: string = '',
      public manufacturersId: string = '',
      public operatingSystem: string = '',
      public ports: string = '',
      public publishedDate: string = '',
      public ram: string = '',
      public screenResolution: string = '',
      public seriesName: string = '',
      public weight: string = '',
      public wLAN: string = '',
      ) {}
}

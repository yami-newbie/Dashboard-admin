import { Manufacturer } from './manufacturer'

export interface MetaData {
   audio?: string
   battery?: string
   camera?: string
   color?: string
   cPUSeries?: string
   createAt?: string
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
   updateAt: string
   weight?: string
   wLAN?: string
}

export class MetaDataPayLoad {
   constructor(public seriesName: string = '', public manufacturersId: string = '') {}
}

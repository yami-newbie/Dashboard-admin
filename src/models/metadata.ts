import { Manufacturer } from './manufacturer'

export class MetaData {
   constructor(
      public id: string = "",
      public audio?: string,
      public battery?: string,
      public camera?: string,
      public color?: string,
      public cPUSeries?: string,
      public dimensions?: string,
      public gPUSeries?: string,
      public hardDrive?: string,
      public manufacturers?: Manufacturer[],
      public manufacturersId: string = "",
      public operatingSystem?: string,
      public ports?: string,
      public publishedDate?: string,
      public ram?: string,
      public screenResolution?: string,
      public seriesName: string = "",
      public weight?: string,
      public wLAN?: string
   ) { }
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

export class Category {
   constructor(
      public id: string = "",
      public name: string = "",
      public description: string = "",
      public createdAt: string = "",
      public updatedAt: string = "",
   ) {}
}

export class CategoryPayLoad {
   constructor(
      public id: string | null = null,
      public name: string = "",
      public description: string = "",
   ) {}
}
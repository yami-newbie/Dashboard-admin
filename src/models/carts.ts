import { User } from './user'

export class Cart {
   constructor(
      public cartItems: CartItem[] = [],
      public createdAt: string = '',
      public updatedAt: string = ''
   ) {}
}

export class CartItem {
   constructor() {}
}

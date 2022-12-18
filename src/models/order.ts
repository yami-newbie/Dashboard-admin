import { Receipt, User } from 'models'

export class Order {
   constructor(
      public id: string = '',
      public receiptId: string = '',
      public receipts: Receipt = new Receipt(),
      public status: string = '',
      public userId: string = '',
      public user: User = new User(),
      public addressFrom: string = '',
      public addressTo: string = '',
      public deleted: boolean = false,
      public createdAt: string = '',
      public updatedAt: string = ''
   ) {}
}

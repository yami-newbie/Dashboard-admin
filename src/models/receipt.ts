import { Payment } from "./payment";

export class Receipt {
   constructor(
      public id: string = '',
      public totalPrice: number = 0,
      public vATPercentage: number = 0,
      public paymentsId: string = '',
      public payments: Payment = new Payment(),
      public hashed: string = '',
      public receiptDetails: ReceiptDetail[] = [],
      public deletedAt: string = '',
      public createdAt: string = '',
      public updatedAt: string = ''
   ) {}
}

export class ReceiptDetail {
   constructor(
      public id: string = '',
      public productId: string = '',
      public amount: number = 0,
      public receiptId: string = '',
      // last price (- giảm giá)
      public price: number = 0,
      public deletedAt: string = '',
      public createdAt: string = '',
      public updatedAt: string = ''
   ) {}
}

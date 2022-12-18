export class Receipt {
   constructor(
      public id: string = '',
      public totalPrice: number = 0,
      public vatPercentage: number = 0,
      public paymentId: string = '',
      public hashed: string = '',
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

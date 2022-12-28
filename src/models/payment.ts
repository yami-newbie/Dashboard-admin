import { User } from './user'

export class Payment {
   constructor(
      public id: string = '',
      public customerPaymentId: string = '',
      public customerPayments: CustomerPayment = new CustomerPayment(),
      public paymentTotal: number = 0,
      public deletedAt: string = '',
      public createdAt: string = '',
      public updatedAt: string = ''
   ) {}
}

export class PaymentMethod {
   constructor(
      public id: string = '',
      public name: string = '',
      public description: string = '',
      public currency: string = '',
      public deletedAt: string = '',
      public createdAt: string = '',
      public updatedAt: string = ''
   ) {}
}

export class PaymentMethodPayLoad {
   constructor(
      public id: string = '',
      public currency: string = '',
      public name: string = '',
      public description: string = ''
   ) {}
}

export class CustomerPayment {
   constructor(
      public id: string = '',
      public userId: string = '',
      public users: User = new User(),
      // stk
      public address: string = '',
      public paymentMethodsId: string = '',
      public paymentMethods: PaymentMethod = new PaymentMethod(),
      public deletedAt: string = '',
      public createdAt: string = '',
      public updatedAt: string = ''
   ) {}
}

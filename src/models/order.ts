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

export class OrderPayload {
   constructor(
      public id: string = '',
      public status: string = '',
      public addressFrom: string = '',
      public addressTo: string = '',
   ) { }
}

export const OrderStatus = {
   accept: {
      value: "accept",
      label: "Đã xác nhận",
      key: 1
   },
   packaging: {
      value: "packaging",
      label: "Đang đóng gói",
      key: 2
   },
   shipping: {
      value: "shipping",
      label: "Đang giao",
      key: 3
   },
   receive: {
      value: "receive",
      label: "Đã giao",
      key: 4
   },
   done: {
      value: "done",
      label: "Đã thanh toán",
      key: 5
   },
   cancel: {
      value: "cancel",
      label: "Đã hủy",
      key: 6
   }
} as Status


export interface Status {
   [name: string]: {
      value: string,
      label: string,
      key: number
   }
}

export const StatusList = ["accept", "packaging", "shipping", "receive", "done", "cancel"]
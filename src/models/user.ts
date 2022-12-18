import { Media } from "./media"
import { Role } from "./roles"

export class User {
   constructor(
      public id: string = "",
      public fullname: string = "",
      public dob: string = "",
      public email: string = "",
      public address: string = "",
      public phone: string = "",
      public password: string = "",
      public rolesId: string = "",
      public roles: Role[] = [],
      public mediasId: string = "",
      public medias: Media[] = [],
      public status: boolean = false,
      public deletedAt: string = "",
      public createdAt: string = "",
      public updatedAt: string = "",
   ) {}
}

export type EditProfileFormValues = {
   name: string
   username: string
   phone: string
   email: string
}

export type ChangePasswordFormValues = {
   oldPassword?: string
   newPassword?: string
   confirmPassword?: string
}
export interface EditCustomerFormValues {
   username: string
   name: string
   phone: string
   email: string
   deliveryInfo: {
      name: string
      phone: string
      email: string
      address: string
   }
}
export interface CustomerQueryParams extends Partial<Record<keyof User, string>> {
   orderBy?: string
   search?: string
   isOrder?: string
}

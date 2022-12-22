import moment from 'moment'
import { Media } from './media'
import { Role } from './roles'

export class User {
   constructor(
      public id: string = '',
      public fullname: string = '',
      public dob: string = '',
      public email: string = '',
      public address: string = '',
      public phone: string = '',
      public password: string = '',
      public rolesId: string = '',
      public roles: Role[] = [],
      public mediasId: string = '',
      public medias: Media[] = [],
      public status: boolean = false,
      public deletedAt: string = '',
      public createdAt: string = '',
      public updatedAt: string = ''
   ) {}
}

export type EditProfileFormValues = {
   name: string
   username: string
   phone: string
   email: string
}

export type ChangePasswordPayLoad = {
   oldPassword?: string
   newPassword?: string
   confirmPassword?: string
}
export class UserPayload {
   constructor(
      public id: string = '',
      public fullname: string = '',
      public dob: string = '',
      public email: string = '',
      public address: string = '',
      public phone: string = '',
      public rolesId: string = '',
      public status: boolean = false,
      public password?: string,
   ) {}
}
export interface CustomerQueryParams extends Partial<Record<keyof User, string>> {
   orderBy?: string
   search?: string
   isOrder?: string
}


export class RegisterStaffPayload {
   constructor(
      public address: string = "",
      public dob: string = moment().format("YYYY-MM-DD"),
      public email: string = "",
      public fullname: string = "",
      public password: string = "",
      public phone: string = "",
      public role: string = "",
   ) {}
}
import IPermission from './permission.model'

export default interface IUser {
  email: string
  permissions: IPermission[]
}

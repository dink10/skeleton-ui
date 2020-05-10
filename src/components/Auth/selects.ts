import { IAppState } from 'store'
import IPermission from 'models/permission.model'

export const selectPermissions = (state: IAppState): IPermission[] => (
  state.auth.user && state.auth.user.permissions ? state.auth.user.permissions : []
)

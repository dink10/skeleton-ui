import { authApi } from 'api'
import { TAppDispatchThunk } from 'store'
import IUser from 'models/user.model'
import { goTo } from 'route-history'
import { CustomAnalytics } from '@gismart/ui.library/core/services/analytics'

const MODULE_NAME = 'AUTH'

// actions types
export const SET_USER = `${MODULE_NAME}/SET_USER`
export const LOGIN = `${MODULE_NAME}/LOGIN`
export const LOGOUT = `${MODULE_NAME}/LOGOUT`

// actions handlers
function setUser(user: IUser) {
  // eslint-disable-next-line no-new
  new CustomAnalytics(user.email)
  return ({
    type: SET_USER,
    payload: {
      ...user,
      permissions: user.permissions.filter(({ effect }) => effect === 'deny'),
    },
  })
}

export const fetchUser = (): any => async (dispatch: TAppDispatchThunk<IUser>): Promise<void> => {
  const response = await authApi.me()

  if (!response.success || !response.data) {
    goTo('/login')
    return
  }

  dispatch(setUser(response.data))
}

declare const gapi: any
export const loginAction = (): any => async (dispatch: TAppDispatchThunk<IUser>) => {
  gapi.load('auth2', {
    callback: async () => {
      gapi.auth2.init({
        // eslint-disable-next-line @typescript-eslint/camelcase
        ux_mode: 'popup',
      })

      try {
        const auth2 = await gapi.auth2.getAuthInstance()
        const { code } = await auth2.grantOfflineAccess({
          scope: 'profile email',
        })
        const response = await authApi.login({ code })

        if (response.success && response.data) {
          dispatch(setUser(response.data))
          goTo('/')
        } else {
          goTo('/login')
        }

      } catch (err) {
        console.error(`LOGIN FAILED: ${err}`)
      }
    },
  })
}

export const logoutAction = (): any => async (dispatch: TAppDispatchThunk<never>): Promise<void> => {
  const response = await authApi.logout()
  if (!response.success) {
    console.error(`LOGOUT FAILED`)

    return
  }

  dispatch({
    type: LOGOUT,
  })
  goTo('/login')
}

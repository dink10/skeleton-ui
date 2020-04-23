import { authApi } from 'api'
import { TAppDispatchThunk } from 'store'
import IUser from 'models/user.model'
import { goTo } from 'route-history'

const MODULE_NAME = 'AUTH'

// actions types
export const SET_USER = `${MODULE_NAME}/SET_USER`
export const LOGIN = `${MODULE_NAME}/LOGIN`
export const LOGOUT = `${MODULE_NAME}/LOGOUT`

// actions handlers
export const fetchUser = (): any => {
  return async (dispatch: TAppDispatchThunk<IUser>): Promise<void> => {
    const response = await authApi.me()

    if (!response.success) {
      goTo('/login')
      return
    }

    dispatch({
      type: SET_USER,
      payload: response.body,
    })
  }
}

declare const gapi: any
export const loginAction = ():any => async (dispatch: TAppDispatchThunk<IUser>) => {
  debugger
  gapi.load('auth2', {
    callback: async () => {
      gapi.auth2.init({
        ux_mode: 'popup',
      })

      try {
        const auth2 = await gapi.auth2.getAuthInstance()
        const { code } = await auth2.grantOfflineAccess({
          scope: 'profile email',
          hd: 'gismart.com',
        })
        const response = await authApi.login(code)

        if(response.success) {
          dispatch({
            type: SET_USER,
            payload: response.body,
          })
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
    console.error(`LOGOUT FAILED: ${response.status}`)

    return
  }

  dispatch({
    type: LOGOUT,
  })
  goTo('/login')
}

/* eslint-disable no-undef */
import api from '/api'
import { goTo } from '/history'

const MODULE_NAME = 'AUTH'

const { auth } = api.services

// ACTIONS TYPES
export const FETCH_USER = `${MODULE_NAME}/FETCH_USER`
export const LOGIN = `${MODULE_NAME}/LOGIN`
export const LOGOUT = `${MODULE_NAME}/LOGOUT`

// ACTIONS HANDLERS
export function fetchUserAction() {
  return async (dispatch) => {
    try {
      const user = await auth.me()
      dispatch({
        type: FETCH_USER,
        payload: user,
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export const loginAction = () => async (dispatch) => (
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
        const user = await auth.login(code)
        dispatch({
          type: LOGIN,
          payload: user,
        })
        goTo('/')
      } catch (err) {
        if (err.name) {
          console.error(`LOGIN FAILED: ${err.name}(${err.code}): ${err.message}`)
        }
        // TODO: Add user friendly notification
      }
    },
  })
)

export const logoutAction = () => (async (dispatch) => {
  try {
    await auth.logout()
    dispatch({
      type: LOGOUT,
    })
    goTo('/login')
  } catch (err) {
    console.error(`LOGOUT FAILED: ${err}`)
  }
})

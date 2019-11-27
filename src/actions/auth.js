/* eslint-disable no-undef */
import api from '/api'
import { goTo } from '/history'

const MODULE_NAME = 'AUTH'

const { auth } = api.services

// ACTIONS TYPES
export const FETCH_USER = `${MODULE_NAME}/FETCH_USER`
export const LOGIN = `${MODULE_NAME}/LOGIN`

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
      goTo('/login')
    }
  }
}

export const loginAction = () => async (dispatch) => (
  new Promise((resolve, reject) => {
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
          resolve()
        } catch (err) {
          if (err.name) {
            console.error(`LOGIN FAILED: ${err.name}(${err.code}): ${err.message}`)
          }
          reject()
        }
      },
    })
  })
)

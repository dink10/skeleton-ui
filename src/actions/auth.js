import api from '/api'
import { goTo } from '/history'

const { auth } = api.services

// ACTIONS TYPES
export const AUTH = 'AUTH'
export const LOGIN = 'LOGIN'

// ACTIONS HANDLERS
export function authAction() {
  return async (dispatch) => {
    try {
      const user = await auth.me()
      dispatch({
        type: AUTH,
        payload: user,
      })
    } catch (err) {
      console.error(err)
      goTo('/login')
    }
  }
}

export function loginAction() {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
    })
    goTo('/home')
  }
}

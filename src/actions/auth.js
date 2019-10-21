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

export function loginAction() {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
    })
    goTo('/home')
  }
}

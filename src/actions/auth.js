import { goTo } from '/history'

export const LOGIN = 'LOGIN'

export function loginAction() {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
    })
    goTo('/home')
  }
}

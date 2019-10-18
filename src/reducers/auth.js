import { LOGIN } from '/actions/auth'

const initState = {
  isLoggedIn: false,
  user: null,
}

function authReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN: {
      return { ...state, isLoggedIn: true }
    }
    default:
      return state
  }
}

export default authReducer

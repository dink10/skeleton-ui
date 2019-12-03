import {
  LOGIN,
  LOGOUT,
  FETCH_USER,
} from '/actions/auth'

const initState = {
  isLoggedIn: false,
  user: {},
}

function authReducer(state = initState, { type, payload = null }) {
  switch (type) {
    case LOGIN:
    case FETCH_USER: {
      return { ...state, user: payload, isLoggedIn: true }
    }
    case LOGOUT: {
      return { ...state, isLoggedIn: true, user: {} }
    }
    default:
      return state
  }
}

export default authReducer

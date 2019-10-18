import {
  LOGIN,
  AUTH,
} from '/actions/auth'

const initState = {
  isLoggedIn: false,
  user: null,
}

function authReducer(state = initState, { type, payload = null }) {
  switch (type) {
    case AUTH: {
      return { ...state, user: payload, isLoggedIn: true }
    }
    case LOGIN: {
      return { ...state, isLoggedIn: true }
    }
    default:
      return state
  }
}

export default authReducer

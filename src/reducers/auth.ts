import { AnyAction } from 'redux'
import IUser from 'models/user.model'
import {
  LOGIN,
  LOGOUT,
  SET_USER,
} from 'actions/auth'

const initState = {
  isLoggedIn: false,
}

export interface IAuthState {
  isLoggedIn: boolean
  user?: IUser
}

function authReducer(state: IAuthState = initState, { type, payload = null }: AnyAction) {
  let nextState: IAuthState

  switch (type) {
    case LOGIN:
    case SET_USER: {
      nextState = {
        ...state,
        user: payload as IUser,
        isLoggedIn: true,
      }
      break
    }
    case LOGOUT: {
      nextState = {
        ...state,
        user: undefined,
        isLoggedIn: false,
      }
      break
    }
    default:
      nextState = state
      break
  }

  return nextState
}

export default authReducer

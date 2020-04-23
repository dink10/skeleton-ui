import { AnyAction } from 'redux'
import {
  START_FETCHING,
  STOP_FETCHING,
  SET_ERROR,
  RESET_ERROR,
} from 'actions/common'

const initState = {
  fetching: false,
  error: undefined,
  actionList: [],
}

export interface ICommonState {
  fetching: boolean
  actionList: string[]
  error?: string
}

function commonReducer(state: ICommonState = initState, { type, payload = null }: AnyAction) {
  let nextState: ICommonState

  switch (type) {
    case START_FETCHING: {
      nextState = {
        fetching: true,
        actionList: state.actionList.concat(payload as string),
      }
      break
    }
    case STOP_FETCHING: {
      nextState = {
        fetching: !!payload.length,
        actionList: payload as string[],
      }
      break
    }
    case SET_ERROR: {
      nextState = {
        ...state,
        error: payload as string,
      }
      break
    }
    case RESET_ERROR: {
      nextState = {
        ...state,
        error: undefined,
      }
      break
    }
    default:
      nextState = state
      break
  }

  return nextState
}

export default commonReducer

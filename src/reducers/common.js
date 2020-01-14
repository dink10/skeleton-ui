import {
  START_FETCHING,
  STOP_FETCHING,
  SET_ERROR,
  RESET_ERROR,
} from '/actions/common'

const initState = {
  fetching: false,
  error: null,
}

function commonReducer(state = initState, { type, payload = null }) {
  switch (type) {
    case START_FETCHING: {
      return { ...state, fetching: true }
    }
    case STOP_FETCHING: {
      return { ...state, fetching: false }
    }
    case SET_ERROR: {
      return { ...state, error: payload }
    }
    case RESET_ERROR: {
      return { ...state, error: null }
    }
    default:
      return state
  }
}

export default commonReducer

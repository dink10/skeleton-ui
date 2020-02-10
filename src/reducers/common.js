import {
  START_FETCHING,
  STOP_FETCHING,
  SET_ERROR,
  RESET_ERROR,
} from '/actions/common'

const initState = {
  fetching: false,
  error: null,
  actionList: [],
}

function commonReducer(state = initState, { type, payload = null }) {
  switch (type) {
    case START_FETCHING: {
      return { fetching: true, actionList: state.actionList.concat(payload) }
    }
    case STOP_FETCHING: {
      return { fetching: !!payload.length, actionList: payload }
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

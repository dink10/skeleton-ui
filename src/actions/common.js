import errorParser from '/services/errorParser'

const MODULE_NAME = 'COMMON'

// ACTIONS TYPES
export const START_FETCHING = `${MODULE_NAME}/START_FETCHING`
export const STOP_FETCHING = `${MODULE_NAME}/STOP_FETCHING`
export const SET_ERROR = `${MODULE_NAME}/SET_ERROR`
export const RESET_ERROR = `${MODULE_NAME}/RESET_ERROR`

// ACTIONS HANDLERS
export function startFetching() {
  return {
    type: START_FETCHING,
  }
}

export function stopFetching() {
  return {
    type: STOP_FETCHING,
  }
}

export function showError(err) {
  return {
    type: SET_ERROR,
    payload: errorParser(err),
  }
}

export function resetError() {
  return {
    type: RESET_ERROR,
  }
}

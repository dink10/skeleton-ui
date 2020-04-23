import { IAction, IAppState, TAppDispatchThunk } from 'store'

const MODULE_NAME = 'COMMON'

// actions types
export const START_FETCHING = `${MODULE_NAME}/START_FETCHING`
export const STOP_FETCHING = `${MODULE_NAME}/STOP_FETCHING`
export const SET_ERROR = `${MODULE_NAME}/SET_ERROR`
export const RESET_ERROR = `${MODULE_NAME}/RESET_ERROR`

// actions handlers
export function startFetching(action: string): IAction<string>{
  return {
    type: START_FETCHING,
    payload: action,
  }
}

export function stopFetching(actionToStop: string): any {
  return (dispatch: TAppDispatchThunk<string[]>, getState: () => IAppState) => {
    const runningActions = getState().common.actionList
    const fetchList = runningActions.filter((action: string) => action && action !== actionToStop)

    dispatch({
      type: STOP_FETCHING,
      payload: fetchList,
    })
  }
}

export function showError(err: string): IAction<string> {
  return {
    type: SET_ERROR,
    payload: err,
  }
}

export function resetError(): IAction<never> {
  return {
    type: RESET_ERROR,
  }
}

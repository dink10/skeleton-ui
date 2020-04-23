import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { RouterState } from 'connected-react-router'

import { IAuthState } from 'reducers/auth'
import { ICommonState } from 'reducers/common'

export interface IAction<T> extends Action<string> {
  payload?: T
}

export interface IAppState {
  router: RouterState
  auth: IAuthState
  common: ICommonState
}

export type TAppActionThunk<PayloadType, ReturnType = void, > = ThunkAction<
  ReturnType,
  IAppState,
  unknown,
  IAction<PayloadType>
>

export type TAppDispatchThunk<PayloadType> = ThunkDispatch<
  IAppState,
  unknown,
  IAction<PayloadType>
>

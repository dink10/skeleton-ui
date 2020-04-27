import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import routeHistory from 'route-history'

import authReducer from 'reducers/auth'
import commonReducer from 'reducers/common'
import { IAppState } from './models'

const rootReducer = combineReducers<IAppState>({
  router: connectRouter(routeHistory),
  auth: authReducer,
  common: commonReducer,
})

export default rootReducer

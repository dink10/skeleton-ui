import { combineReducers } from 'redux'
import { IAppState } from './models'
import { connectRouter } from 'connected-react-router'
import routeHistory from 'route-history'

import authReducer from 'reducers/auth'
import commonReducer from 'reducers/common'

const rootReducer = combineReducers<IAppState>({
  router: connectRouter(routeHistory),
  auth: authReducer,
  common: commonReducer,
})

export default rootReducer

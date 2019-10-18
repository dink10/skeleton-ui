import thunkMiddleware from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux'

import history from '/history'
import authReducer from './auth'

const reducers = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
})

const middlewares = compose(
  applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware,
  ),
  /* eslint-disable no-underscore-dangle */
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
  /* eslint-enable */
)

export default createStore(
  reducers,
  middlewares,
)

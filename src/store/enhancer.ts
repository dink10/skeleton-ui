import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import routeHistory from 'route-history'

const enhancer = applyMiddleware(thunk, logger, routerMiddleware(routeHistory))

export default enhancer

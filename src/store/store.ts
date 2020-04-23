import { createStore, Store } from 'redux'

import { IAction, IAppState } from './models'
import rootReducer from './rootReducer'
import enhancer from './enhancer'

export type AppStore = Store<IAppState>

const store: AppStore = createStore<IAppState, IAction<any>, any, any>(rootReducer, enhancer)

export default store

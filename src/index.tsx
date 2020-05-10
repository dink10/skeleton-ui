import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import store from 'store'
import { fetchUser } from 'actions/auth'
import '@gismart/ui.library/core/style.css'
import App from './components/App'

const render = () => {
  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('root'))
}

// render()
store.dispatch(fetchUser())
  .then(render)

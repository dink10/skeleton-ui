import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import { fetchUserAction } from '/actions/auth'
// import store from '/reducers/store'

// import 'gismart-ui/core/style.css'
import App from './components/App'

// const render = () => {
//   ReactDOM.render((
//     <Provider store={store}>
//       <App />
//     </Provider>
//   ), document.getElementById('root'))
// }

// store.dispatch(fetchUserAction())
//   .then(() => render())

  ReactDOM.render((
    <App />
  ), document.getElementById('root'))

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';
// import { auth } from './services/authentication';
// import { setConfig } from './actions/appActions';
import store from './reducers/store';

import 'gismart-ui/core/style.css';
import App from './components/App';

const render = () => {
  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('root'));
};

render();
// store.dispatch(setConfig())
//   .then(auth)
//   .then(() => render());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

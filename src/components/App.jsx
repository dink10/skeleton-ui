import React from 'react'
// import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router'
import history from '/history'

import { Login, NotFound } from './pages'
import Secure from './Secure'

function App() {
  return (
    <ConnectedRouter history={history}>
      <>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/home"
            render={() => (
              <Secure>
                <div>Hello home</div>
              </Secure>
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </>
    </ConnectedRouter>
  )
}

export default App

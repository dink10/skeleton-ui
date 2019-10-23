import React from 'react'
// import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import history from '/history'
import Layout, { Footer, Content } from 'gismart-ui/core/components/Layout'
import Header from './Header'

import { Login, NotFound } from '/pages'
import Secure from './Secure'

function App() {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Header />
        <Content>
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
        </Content>
        <Footer>©2019 Created by GISMART</Footer>
      </Layout>
    </ConnectedRouter>
  )
}

export default App

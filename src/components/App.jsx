import React from 'react'
// import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import history from '/history'
import Layout, {
  Footer, Content, MainWrapper, SubHeader,
} from 'gismart-ui/core/components/Layout'
import Header from './Header'

import { Login, NotFound } from '/pages'
import Secure from './Secure'

function App() {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Header />
        <MainWrapper>
          <SubHeader>
            Breadcrumb
          </SubHeader>
          <Content>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Switch>
              <Route path="/login" component={Login} />
              <Route
                path="/home"
                render={() => (
                  <Secure>
                    <div>Home page</div>
                  </Secure>
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </Content>
        </MainWrapper>
        <Footer>©2019 Created by GISMART</Footer>
      </Layout>
    </ConnectedRouter>
  )
}

export default App

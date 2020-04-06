import React from 'react'
// import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import history from '/history'
import { BackToTop } from 'gismart-ui/core/components'
import Layout, {
  Footer, Content, MainWrapper, SubHeader,
} from 'gismart-ui/core/components/Layout'
import Header from './Header'

import { Login, NotFound } from '/pages'
import Secure from './Auth'
import Spinner from './Spinner'
import ErrorNotification from './ErrorNotification'
import Breadcrumb from './Breadcrumb'

function App() {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Header />
        <MainWrapper>
          <Spinner />
          <SubHeader>
            <Content>
              <Breadcrumb />
            </Content>
          </SubHeader>
          <Content>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Switch>
              <Route path="/login" component={Login} />
              {/* IMPORTANT ! You must send props to your component inside Secure for use isEditable, isReadable, isDeletable, isCreatable props */}
              <Route
                path="/home"
                render={() => (
                  <Secure
                    resource="/home"
                    component={(props) => { console.log(props); return <div>Home page</div> }}
                  />
                )}
              />
              <Route
                path="/test"
                render={() => (
                  <Secure
                    resource="/test"
                    component={(props) => { console.log(props); return <div>Test page</div> }}
                  />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </Content>
        </MainWrapper>
        <Footer>©2020 Created by GISMART</Footer>
        <BackToTop />
        <ErrorNotification />
      </Layout>
    </ConnectedRouter>
  )
}

export default App

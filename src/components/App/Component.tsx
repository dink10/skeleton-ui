import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import routeHistory from 'route-history'
import { Switch, Route, Redirect } from 'react-router-dom'
import { BackToTop } from '@gismart/ui.library/core/components'
import Layout, {
  Footer, Content, MainWrapper, SubHeader,
} from '@gismart/ui.library/core/components/Layout'
import { Login, NotFound } from 'pages'
import Header from '../Header'

import Secure from '../Auth'
import Spinner from '../Spinner'
import ErrorNotification from '../ErrorNotification'
import Breadcrumb from '../Breadcrumb'

function App() {
  return (
    <ConnectedRouter history={routeHistory}>
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
              {/* IMPORTANT ! You must send props to your component inside Secure for use
              isEditable, isReadable, isDeletable, isCreatable props */}
              <Route
                path="/home"
                render={() => (
                  <Secure
                    resource="/home"
                    component={() => <div>Home page</div>}
                  />
                )}
              />
              <Route
                path="/test"
                render={() => (
                  <Secure
                    resource="/test"
                    component={() => <div>Test page</div>}
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

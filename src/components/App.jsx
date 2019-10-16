import React from 'react'
// import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router'
import Button from 'gismart-ui/core/components/Button'
import history from '../history'


export default function App() {
  return (
    <ConnectedRouter history={history}>
      <h1>SCELETON</h1>
      <Button> Test </Button>
    </ConnectedRouter>
  )
}

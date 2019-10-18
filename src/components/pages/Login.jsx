import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'gismart-ui/core/components'
import { loginAction } from '/actions/auth'
import { PageWrapper } from './style'

function Login({ login }) {
  return (
    <PageWrapper>
      <Button size="large" onClick={login}>Login</Button>
    </PageWrapper>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
}

const mapActionsToProps = (dispatch) => ({
  login: () => dispatch(loginAction()),
})

export default connect(null, mapActionsToProps)(Login)

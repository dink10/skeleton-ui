import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { goTo } from '/history'
import { Button } from 'gismart-ui/core/components'
import { loginAction } from '/actions/auth'
import { PageWrapper } from './style'

function Login({ login, isLoggedIn }) {
  if (isLoggedIn) {
    goTo('/')
    return null
  }

  return (
    <PageWrapper>
      <Button size="large" onClick={login}>Login</Button>
    </PageWrapper>
  )
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

const mapActionsToProps = (dispatch) => ({
  login: () => dispatch(loginAction()),
})

export default connect(mapStateToProps, mapActionsToProps)(Login)

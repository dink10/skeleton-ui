import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LoginPg } from 'gismart-ui/core/components'
import { loginAction } from '/actions/auth'

function Login({ login }) {
  return (<LoginPg appName="Skeleton" onLogin={login} />)
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
}

const mapActionsToProps = (dispatch) => ({
  login: () => dispatch(loginAction()),
})

export default connect(null, mapActionsToProps)(Login)

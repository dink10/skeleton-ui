import React from 'react'
import { connect } from 'react-redux'
import { LoginPg } from 'gismart-ui/core/components'
import { loginAction } from 'actions/auth'

export interface ILoginPageProps {
  login?: () => void
}

const LoginPage: React.FC<ILoginPageProps> = ({ login }) => {
  return (<LoginPg appName="Skeleton" onLogin={login} />)
}

const mapActionsToProps = (dispatch) => ({
  login: () => dispatch(loginAction()),
})

export default connect(null, mapActionsToProps)(LoginPage)

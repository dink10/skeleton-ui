import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { goTo } from '/history'
import { ErrorPg } from 'gismart-ui/core/components'
import { getPermissions } from './utils'
import { selectPermissions } from './selects'
import { permissionsPropType } from './propTypes'

function Secure(props) {
  const {
    isLoggedIn, resource, permissions, component: Component,
  } = props
  if (!isLoggedIn) {
    goTo('/login')
  }

  const { allow, permissons } = useMemo(() => getPermissions(resource, permissions), [resource, permissions])
  if (!allow) {
    return <ErrorPg statusCode={403} onClick={() => goTo('/')} />
  }

  return (<Component {...permissons} />)
}

Secure.defaultProps = {
  resource: null,
}

Secure.propTypes = {
  resource: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  permissions: permissionsPropType.isRequired,
  component: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  permissions: selectPermissions(state),
  user: state.auth.user,
})

export default connect(mapStateToProps)(Secure)

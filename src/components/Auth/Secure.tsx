import React, { useMemo, ComponentType } from 'react'
import { connect } from 'react-redux'
import { goTo } from 'route-history'
import { ErrorPg } from 'gismart-ui/core/components'
import { getPermissions } from './utils'
import { selectPermissions } from './selects'
import IPermission from 'models/permission.model'

const FORBIDDEN_ERROR = 403

export interface ISecure {
  resource: string
  component: ComponentType<any>
  isLoggedIn?: boolean
  permissions?: IPermission[]
}

const Secure: React.FC<ISecure> = ({ isLoggedIn, resource, permissions, component: Component }) => {
  if (!isLoggedIn) {
    goTo('/login')
  }

  const { allow, permissons } = useMemo(() => getPermissions(resource, permissions), [resource, permissions])
  if (!allow) {
    return <ErrorPg statusCode={FORBIDDEN_ERROR} onClick={() => goTo('/')} />
  }

  return (<Component {...permissons} />)
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  permissions: selectPermissions(state),
  user: state.auth.user,
})

export default connect(mapStateToProps)(Secure)

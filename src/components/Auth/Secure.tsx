import React, { useMemo, ComponentType } from 'react'
import { connect } from 'react-redux'
import { goTo } from 'route-history'
import { ErrorPg } from '@gismart/ui.library/core/components'
import IPermission, { TAction } from 'models/permission.model'
import { getPermissions } from './utils'
import { selectPermissions } from './selects'

const FORBIDDEN_ERROR = 403

export interface ISecure {
  resource: string
  action?: TAction
  component: ComponentType<any>
  isLoggedIn?: boolean
  permissions?: IPermission[]
}

const Secure: React.FC<ISecure> = ({
  isLoggedIn, resource, permissions: deniedResources, action, component: Component,
}) => {
  if (!isLoggedIn) {
    goTo('/login')
  }

  const { allow, permissions } = useMemo(() => {
    const { allow: _allow, permissions: _permissions } = getPermissions(resource, deniedResources)

    switch (action) {
      case 'C':
        return { permissions, allow: _allow && _permissions?.isCreatable }
      case 'U':
        return { permissions, allow: _allow && _permissions?.isEditable }
      case 'R':
        return { permissions, allow: _allow && _permissions?.isReadable }
      case 'D':
        return { permissions, allow: _allow && _permissions?.isDeletable }
      default:
        return { allow: _allow, permissions: _permissions }
    }
  }, [resource, deniedResources, action])

  if (!allow) {
    return <ErrorPg statusCode={FORBIDDEN_ERROR} onClick={() => goTo('/')} />
  }

  return (<Component {...permissions} />)
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  permissions: selectPermissions(state),
  user: state.auth.user,
})

export default connect(mapStateToProps)(Secure)

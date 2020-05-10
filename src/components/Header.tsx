import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { IAppState } from 'store'
import { Header as HeaderWrapper } from '@gismart/ui.library/core/components/Layout'
import { logoutAction } from 'actions/auth'
import IPermission from 'models/permission.model'
import IMenuItem from 'models/menuItem.model'
import { isResourceAvailable, selectPermissions } from './Auth'

const menuItems: IMenuItem[] = [{
  id: '/home', text: 'Home', icon: 'home', path: '/home', resource: '/home',
}, {
  id: '/test', text: 'Test', icon: 'eye', path: '/test', resource: '/test',
}]

export interface IHeader {
  permissions?: IPermission[]
  logout?: () => void
}

const Header: React.FC<IHeader> = ({ logout, permissions }) => {
  const { pathname } = useLocation()
  const menu = useMemo(() => menuItems.filter(({ resource }) => isResourceAvailable(resource, permissions, 'R')), [permissions])

  return (
    <HeaderWrapper
      Link={Link}
      menuItems={menu}
      appTitle="Skeleton"
      hideGlobalMenu
      onLogout={logout}
      pathName={pathname}
    />
  )
}

const mapStateToProps = (state: IAppState) => ({
  permissions: selectPermissions(state),
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

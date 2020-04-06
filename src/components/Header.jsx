import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { Header as HeaderWrapper } from 'gismart-ui/core/components/Layout'
import { logoutAction } from '/actions/auth'
import { isResourceAvailable, selectPermissions, permissionsPropType } from './Auth'

const menuItems = [
  {
    id: '/home', text: 'Home', icon: 'home', path: '/home', resource: '/home',
  },
  {
    id: '/test', text: 'Test', icon: 'eye', path: '/test', resource: '/test',
  },
]

function Header({ logout, permissions }) {
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

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  permissions: permissionsPropType.isRequired,
}

const mapStateToProps = (state) => ({
  permissions: selectPermissions(state),
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

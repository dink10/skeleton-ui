import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'gismart-ui/core/components'
import { Header as HeaderWrapper } from 'gismart-ui/core/components/Layout'
import { logoutAction } from '/actions/auth'

const LOGOUT = 'logOut'

function Header({ userImg, logout }) {
  const userMenuClick = useCallback((eventName) => {
    if (eventName === LOGOUT) {
      logout()
    }
  }, [logout])

  const userMenu = (
    <Menu
      onClick={userMenuClick}
      items={[
        { id: LOGOUT, text: 'Log out', icon: 'logout-variant' },
      ]}
    />
  )

  return (
    <HeaderWrapper
      Link={Link}
      userMenu={userMenu}
      userImg={userImg}
      appTitle="Skeleton"
      hideGlobalMenu
    />
  )
}

Header.defaultProps = {
  userImg: '',
}

Header.propTypes = {
  userImg: PropTypes.string,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  userImg: state.auth.user.picture,
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

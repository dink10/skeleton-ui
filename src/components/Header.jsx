import React from 'react'
import PropTypes from 'prop-types'
import { Link, useRouteMatch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Header as HeaderWrapper } from 'gismart-ui/core/components/Layout'
import { logoutAction } from '/actions/auth'

function Header({ logout }) {
  const match = useRouteMatch()
  return (
    <HeaderWrapper
      Link={Link}
      menuItems={[]}
      appTitle="Skeleton"
      hideGlobalMenu
      onLogout={logout}
      pathName={match.path}
    />
  )
}

// Header.defaultProps = {
// }

Header.propTypes = {
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

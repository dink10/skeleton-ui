import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'gismart-ui/core/components'
import { Header as HeaderWrapper } from 'gismart-ui/core/components/Layout'

const userMenu = (
  <Menu
    items={[
      { id: 'logOut', text: 'Log out', icon: 'logout-variant' },
    ]}
  />
)

function Header() {
  return (
    <HeaderWrapper
      Link={Link}
      userMenu={userMenu}
      appTitle="Skeleton"
      hideGlobalMenu
    />
  )
}

export default Header

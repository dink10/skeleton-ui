import React from 'react'
import { Link } from 'react-router-dom'
import { Header as HeaderWrapper, Title } from 'gismart-ui/core/components/Layout'

function Header() {
  return (
    <HeaderWrapper>
      <Title>
        <Link to="/">Skeleton</Link>
      </Title>
    </HeaderWrapper>
  )
}

export default Header

import React from 'react'
import { goTo } from '/history'
import { Button } from 'gismart-ui/core/components'
import { NotFoundWrapper } from './style'

export default function NotFound() {
  return (
    <NotFoundWrapper>
      <h1>Page not found</h1>
      <Button icon="home" onClick={() => goTo('/')}>Home</Button>
    </NotFoundWrapper>
  )
}

import React from 'react'
import { goTo } from '/history'
import { Button } from 'gismart-ui/core/components'
import { PageWrapper } from './style'

export default function NotFound() {
  return (
    <PageWrapper>
      <h1>Page not found</h1>
      <Button size="large" icon="home" onClick={() => goTo('/')}>Home</Button>
    </PageWrapper>
  )
}

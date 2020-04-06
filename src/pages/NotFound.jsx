import React, { useCallback } from 'react'
import { goTo } from '/history'
import { ErrorPg } from 'gismart-ui/core/components'

export default function NotFound() {
  const onClick = useCallback(() => goTo('/'), [])

  return (
    <ErrorPg statusCode={404} onClick={onClick} />
  )
}

import React, { useCallback } from 'react'
import { goTo } from 'route-history'
import { ErrorPg } from 'gismart-ui/core/components'

const NOT_FOUND_ERROR = 404

const NotFound: React.FC = () => {
  const onClick = useCallback(() => goTo('/'), [])

  return (
    <ErrorPg statusCode={NOT_FOUND_ERROR} onClick={onClick} />
  )
}

export default NotFound

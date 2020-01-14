import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { Breadcrumb } from 'gismart-ui/core/components'

function BreadcrumbWrapper({ location: { pathname }, config }) {
  return (<Breadcrumb path={pathname} config={config} Link={Link} />)
}

BreadcrumbWrapper.defaultProps = {
}

BreadcrumbWrapper.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  config: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
}

export default withRouter(BreadcrumbWrapper)

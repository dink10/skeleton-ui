import React from 'react'
import { withRouter, Link, RouteComponentProps } from 'react-router-dom'
import { Breadcrumb as BreadcrumbCmp } from 'gismart-ui/core/components'

export interface IBreadcrumb extends RouteComponentProps{
  config?: {
    [propName: string]: string | {
      icon?: string
      title?: string
    } | undefined
    icon?: string
    title?: string
  }[]
}

const Breadcrumb: React.FC<IBreadcrumb> = ({ location: { pathname }, config }) => (<BreadcrumbCmp path={pathname} config={config} Link={Link} />)

export default withRouter(Breadcrumb)

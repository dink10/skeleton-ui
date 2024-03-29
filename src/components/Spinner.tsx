import React from 'react'
import { connect } from 'react-redux'
import { IAppState } from 'store'
import { Spinner as SpinnerCmp } from '@gismart/ui.library/core/components'

export interface ISpinner {
  fetching?: boolean
}
const Spinner: React.FC<ISpinner> = ({ fetching }) => (fetching ? <SpinnerCmp fullScreen /> : null)

const mapStateToProps = (state: IAppState) => ({
  fetching: state.common.fetching,
})

export default connect(mapStateToProps)(Spinner)

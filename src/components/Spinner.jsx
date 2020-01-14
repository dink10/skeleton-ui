import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spinner } from 'gismart-ui/core/components'


function SpinnerCmp({ fetching }) {
  return (fetching && <Spinner fullScreen />)
}

SpinnerCmp.propTypes = {
  fetching: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  fetching: state.common.fetching,
})

export default connect(mapStateToProps)(SpinnerCmp)

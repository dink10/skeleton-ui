import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal } from 'gismart-ui/core/components'
import { resetError } from '../actions/common'

function ErrorNotification({ error, resetErrorAction }) {
  useEffect(() => {
    if (error) {
      console.log(error)
      const modal = Modal.error({
        title: error.title,
        content: error.message,
        onOk: () => {
          modal.destroy()
          resetErrorAction()
        },
      })
    }
  }, error)

  return (null)
}

ErrorNotification.propTypes = {
  error: PropTypes.string,
}

const mapStateToProps = (state) => ({
  error: state.common.error,
})

const mapDispatchToProps = (dispatch) => ({
  resetErrorAction: () => dispatch(resetError()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification)

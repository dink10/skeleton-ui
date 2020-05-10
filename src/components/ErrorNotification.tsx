import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'gismart-ui/core/components'
import { resetError } from 'actions/common'
import { IAppState } from 'store'

export interface IErrorNotificationProps {
  error?: string
  resetErrorAction?: () => void
}

const ErrorNotification: React.FC<IErrorNotificationProps> = ({ error, resetErrorAction }) => {
  useEffect(() => {
    if (error) {
      console.error(error)
      const modal = Modal.error({
        title: error,
        onOk: () => {
          modal.destroy()
          if (resetErrorAction) {
            resetErrorAction()
          }
        },
      })
    }
  }, [error])

  return null
}

const mapStateToProps = (state: IAppState) => ({
  error: state.common.error,
})

const mapDispatchToProps = (dispatch) => ({
  resetErrorAction: () => dispatch(resetError()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification)

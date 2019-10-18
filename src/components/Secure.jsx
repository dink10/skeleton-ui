import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { goTo } from '/history'

function Secure(props) {
  const { children, isLoggedIn } = props
  if (!isLoggedIn) {
    goTo('/login')
  }

  return (
    <>
      {children}
    </>
  )
}

Secure.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
})

export default connect(mapStateToProps)(Secure)

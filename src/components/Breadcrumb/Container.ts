import { connect } from 'react-redux'

import Component from './Component'

const mapStateToProps = () => ({
  config: [{
    icon: 'home',
  }, {
    title: 'Home',
  }],
})

export default connect(mapStateToProps, null)(Component)

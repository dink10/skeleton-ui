import PropTypes from 'prop-types'

export const permissionsPropType = PropTypes.arrayOf(PropTypes.exact({
  resource: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  effect: 'deny',
}))

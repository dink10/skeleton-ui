import moment from 'moment'

const DEFAULT_FORMAT = 'DD MMM YYYY'

function formatDate(date) {
  return moment(date).format(DEFAULT_FORMAT)
}

formatDate.DEFAULT_FORMAT = DEFAULT_FORMAT

export default formatDate


export default function errorParser(err) {
  if (err.message) {
    return {
      title: err.message,
      message: 'Pls, try to refresh page',
    }
  }

  let message = ''
  if (err.errors) {
    message = Object.keys(err.errors).map((key) => `${key.split(':').join('->')}: ${err.errors[key].join('; ')}`)
  }

  return {
    title: err.error,
    message,
  }
}

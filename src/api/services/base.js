class BaseService {
  relativeURL = ''

  constructor(client) {
    this.client = client
  }

  create(payload) {
    return this.client.do('POST', this.relativeURL, payload)
  }

  get(id) {
    return this.client.do('GET', `${this.relativeURL}/${id}`)
  }

  // TODO: add opportunity to use filters (query strings)
  list() {
    return this.client.do('GET', this.relativeURL)
  }

  update(id, entity) {
    return this.client.do('PUT', `${this.relativeURL}/${id}`, entity)
  }
}

export default BaseService

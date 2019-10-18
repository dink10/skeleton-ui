class BaseService {
  relativeURL = ''

  constructor(client) {
    this.client = client
  }

  create(payload) {
    return this.client.doRequest('POST', this.relativeURL, payload)
  }

  get(id) {
    return this.client.doRequest('GET', `${this.relativeURL}/${id}`)
  }

  // TODO: add opportunity to use filters (query strings)
  list() {
    return this.client.doRequest('GET', this.relativeURL)
  }

  update(id, entity) {
    return this.client.doRequest('PUT', `${this.relativeURL}/${id}`, entity)
  }
}

export default BaseService

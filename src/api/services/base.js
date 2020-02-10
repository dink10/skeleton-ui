class BaseService {
  relativeURL = ''

  constructor(client) {
    this.client = client
  }

  create(payload) {
    return this.client.doRequest('POST', this.relativeURL, payload)
  }

  get(id, query) {
    return this.client.doRequest('GET', `${this.relativeURL}/${id}`, query)
  }

  list(query) {
    return this.client.doRequest('GET', this.relativeURL, query)
  }

  update(id, entity) {
    return this.client.doRequest('PUT', `${this.relativeURL}/${id}`, entity)
  }
}

export default BaseService

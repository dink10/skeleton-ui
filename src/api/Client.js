import { goTo } from '/history'

class Client {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.baseHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }

  makeQuery = (queryObj) => `?${Object
    .entries(queryObj)
    .map(([key, value]) => `${key}=${typeof value === 'object' ? JSON.stringify(value) : value}`)}`

  doRequest = async (method, path, payload) => {
    let url = `${this.baseUrl}/${path}`
    const headers = { ...this.baseHeaders }
    const reqData = {
      headers,
      method,
      credentials: 'include',
    }

    if (method === 'GET' && payload) {
      const query = this.makeQuery(payload)
      url = `${this.baseUrl}/${path}${query}`
    } else if (payload) {
      reqData.body = JSON.stringify(payload)
    }

    const response = await fetch(url, reqData)
    if (response.status === 401) {
      goTo('/login')
      throw new Error('Unauthorized')
    }
    if (response.status === 204) {
      return null
    }

    if (!response.ok) {
      throw response
    }
    return await response.json()
  }
}

export default Client

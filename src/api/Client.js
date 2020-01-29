import { goTo } from '/history'

class Client {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.baseHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }

  doRequest = async (method, path, payload) => {
    const url = `${this.baseUrl}/${path}`
    const headers = { ...this.baseHeaders }
    const reqData = {
      headers,
      method,
      credentials: 'include',
    }

    if (payload) {
      reqData.body = JSON.stringify(payload)
    }

    const response = await fetch(url, reqData)
    if (response.status === 401) {
      goTo('/login')
      return {}
    } else if (response.status === 204) {
      return null
    }

    if (!response.ok) {
      throw response
    }
    return await response.json()
  }
}

export default Client

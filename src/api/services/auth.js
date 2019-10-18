import BaseService from './base'

class AuthService extends BaseService {
  login(code) {
    return this.client.doRequest('POST', 'auth/login', { code })
  }

  me() {
    return this.client.doRequest('GET', 'auth/me')
  }

  logout() {
    return this.client.doRequest('POST', 'auth/logout')
  }
}

export default AuthService

import BaseService from './base'

class AuthService extends BaseService {
  login(code) {
    return this.client.do('POST', 'auth/login', { code })
  }

  me() {
    return this.client.do('GET', 'auth/me')
  }

  logout() {
    return this.client.do('POST', 'auth/logout')
  }
}

export default AuthService

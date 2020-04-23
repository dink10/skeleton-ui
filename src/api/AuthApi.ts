import { IResponseResult, IRequestOptions, RequestMethod } from 'services/api.service'
import IUser from 'models/user.model'

import BaseApi from './BaseApi'

class AuthApi extends BaseApi<IUser> {
  loginPath: string ='auth/login'
  mePath: string ='auth/me'
  logoutPath: string ='auth/logout'

  me(): Promise<IResponseResult<IUser>> {
    const options: IRequestOptions = {
      method: RequestMethod.Get,
    }

    return this.api.makeRequest<IUser>(this.mePath, options)
  }

  login(entity: { code: string }): Promise<IResponseResult<IUser>> {
    const options: IRequestOptions = {
      method: RequestMethod.Post,
      body: entity as unknown as object,
    }

    return this.api.makeRequest<IUser>(this.loginPath, options)
  }

  logout(): Promise<IResponseResult<never>> {
    const options: IRequestOptions = {
      method: RequestMethod.Post,
    }

    return this.api.makeRequest<never>(this.logoutPath, options)
  }
}

export default AuthApi

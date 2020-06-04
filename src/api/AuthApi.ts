// TODO: make it more clear
import { IRequestOptions, RequestMethod } from 'services/api.service'
import IUser from 'models/user.model'

interface IAuthResponseResult<T> {
  success: boolean
  data?: T
}
class AuthApi {
  loginPath ='/auth/login'
  mePath ='/auth/me'
  logoutPath ='/auth/logout'

  me(): Promise<IAuthResponseResult<IUser>> {
    const options: IRequestOptions = {
      method: RequestMethod.Get,
    }

    return this.makeRequest<IUser>(this.mePath, options)
  }

  login(entity: { code: string }): Promise<IAuthResponseResult<IUser>> {
    const options: IRequestOptions = {
      method: RequestMethod.Post,
      body: entity as unknown as object,
    }

    return this.makeRequest<IUser>(this.loginPath, options)
  }

  logout(): Promise<IAuthResponseResult<never>> {
    const options: IRequestOptions = {
      method: RequestMethod.Post,
    }

    return this.makeRequest<never>(this.logoutPath, options)
  }

  private async makeRequest<T>(url: string, options: IRequestOptions): Promise<IAuthResponseResult<T>> {
    try {
      const res = await fetch(`/api/${url}`, {
        method: options.method,
        body: options.body && JSON.stringify(options.body),
      })

      return {
        success: res.ok,
        data: res.ok ? (await res.json() as T) : undefined,
      }
    } catch (error) {
      console.error(error)
      return {
        success: false,
      }
    }
  }
}

export default AuthApi

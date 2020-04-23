/**
 * API_PREFIX - declare in webpack.config.js as a global variable
 */
declare const API_PREFIX: string

export interface IRequestParams {
  [propName: string]: number | boolean | string
}

export interface IRequestOptions {
  method: RequestMethod
  params?: IRequestParams
  headers?: Headers
  body?: object
}

export enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Head = 'HEAD',
  Options = 'OPTIONS',
}

export interface IResponseResult<T> {
  success: boolean
  status?: number
  body?: T
}

class ApiService {
  public async makeRequest<T>(url: string, options: IRequestOptions): Promise<IResponseResult<T>> {
    try {
      const requestURL = this.buildURL(url, options.params)
      const requestBody = options.body ? JSON.stringify(options.body) : undefined
      const res = await fetch(requestURL, {
        method: options.method,
        headers: this.buildHeaders(options.headers),
        body: requestBody,
      })

      if(!res.ok) {
        return this.processError<T>(res)
      }

      return this.processResponse<T>(res)
    } catch (error) {
      return this.processError<T>(error)
    }
  }

  // todo: implement work with array type of param
  protected buildQuery(params?: IRequestParams) {
    let query = ''

    if (params) {
      let items: string[] = []
      for (let key in params) {
        items.push(encodeURI(`${key}=${params[key]}`))
      }
      query = `?${items.join('&')}`
    }

    return query
  }

  protected buildURL(url: string, params?: IRequestParams): string {
    const query: string = this.buildQuery(params)

    return `${API_PREFIX}/${url}${query}`
  }

  protected buildHeaders(headers?: Headers): Headers {
    if (!headers) {
      headers = new Headers({
        'Content-Type': 'application/json',
      })
    }

    if (!headers.get('Content-Type')) {
      headers.append('Content-Type', 'application/json')
    }

    return headers
  }

  protected async processResponse<T>(response: Response): Promise<IResponseResult<T>> {
    const result: T = await response.json()

    return {
      success: true,
      body: result,
      status: response.status,
    }
  }

  protected processError<T>(error: any): Promise<IResponseResult<T>> {
    return Promise.resolve<IResponseResult<T>>({
      success: false,
      status: error.status,
    })
  }
}

export default ApiService

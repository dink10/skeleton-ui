import { goTo } from 'route-history'
import { UNAUTHORIZED_STATUS } from 'root-constants'

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
  list?: T[]
  entity?: T
}

export interface IResponseBody<T> {
  list?: T[]
  entity?: T
  error?: string
}

// TODO: apply common response structure for success flow
// TODO: apply common response structure for failed flow
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

      if (!res.ok) {
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
      const items: string[] = []
      Object.keys(params).forEach((key) => {
        items.push(encodeURI(`${key}=${params[key]}`))
      })
      query = `?${items.join('&')}`
    }

    return query
  }

  protected buildURL(url: string, params?: IRequestParams): string {
    const query: string = this.buildQuery(params)

    return `${API_PREFIX}/${url}${query}`
  }

  protected getDefaultHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
    })
  }

  protected buildHeaders(headers: Headers = this.getDefaultHeaders()): Headers {
    if (!headers.get('Content-Type')) {
      headers.append('Content-Type', 'application/json')
    }

    return headers
  }

  protected async processResponse<T>(response: Response): Promise<IResponseResult<T>> {
    const result: IResponseBody<T> = await response.json()

    return {
      success: true,
      status: response.status,
      // TODO: check latter
      list: result.list || [],
      entity: result.entity,
    }
  }

  protected processError<T>(error: any): Promise<IResponseResult<T>> {
    if (error.status === UNAUTHORIZED_STATUS) {
      goTo('/login')
    }

    return Promise.resolve<IResponseResult<T>>({
      success: false,
      status: error.status,
    })
  }
}

export default ApiService

// TODO: apply this rules to api.services
// Error:
// {
//   code: 502,
//   error: 'Bad gateway'
// }

// Reponce body:
// {
//   code: 200,
//   // If you endpoint return only one item (f.e. you request some entity by id)
//   entity {} -> if you request entity by id
//   // else if you request list of data
//   meta: {} // some metadata f.e. total if you request part of full list
//   data: []
// }

// Query params:
// available type: string
// * if you send array: should be string separated `,`
// f.e.  ['a', 'b', 'c'] . -> a,b,c
// * for boolean variable:
// false -> 'false'
// true -> 'true'

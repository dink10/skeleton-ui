import ApiService, { IResponseResult, IRequestOptions, RequestMethod, IRequestParams } from 'services/api.service'

class BaseApi<T> {
  protected api: ApiService
  protected path: string = ''

  constructor(api: ApiService) {
    this.api = api
  }

  create(entity: T): Promise<IResponseResult<T>> {
    const options: IRequestOptions = {
      method: RequestMethod.Post,
      body: entity as unknown as object,
    }

    return this.api.makeRequest<T>(this.path, options)
  }

  get(id: number, params: IRequestParams): Promise<IResponseResult<T>> {
    const options: IRequestOptions = {
      method: RequestMethod.Get,
      params,
    }

    return this.api.makeRequest<T>(`${this.path}/${id}`, options)
  }

  // todo: make more clear type
  delete(id: number, params: IRequestParams): Promise<IResponseResult<never>> {
    const options: IRequestOptions = {
      method: RequestMethod.Delete,
      params,
    }

    return this.api.makeRequest<never>(`${this.path}/${id}`, options)
  }

  list(params: IRequestParams): Promise<IResponseResult<T[]>> {
    const options: IRequestOptions = {
      method: RequestMethod.Get,
      params,
    }

    return this.api.makeRequest<T[]>(this.path, options)
  }

  update(id: number, entity: T): Promise<IResponseResult<T>> {
    const options: IRequestOptions = {
      method: RequestMethod.Put,
      body: entity as unknown as object,
    }

    return this.api.makeRequest<T>(`${this.path}/${id}`, options)
  }
}

export default BaseApi

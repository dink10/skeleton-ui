import ApiService, {
  IResponseResult, IRequestOptions, RequestMethod, IRequestParams,
} from 'services/api.service'

class BaseApi<T> {
  protected api: ApiService
  protected basePath = '' // need if you have version prefix. fe v1/
  protected path = ''

  constructor(api: ApiService) {
    this.api = api
  }

  create(entity: T): Promise<IResponseResult<T>> {
    const options: IRequestOptions = {
      method: RequestMethod.Post,
      body: entity as unknown as object,
    }

    return this.api.makeRequest<T>(this.buildFullPath(), options)
  }

  get(id: number, params: IRequestParams): Promise<IResponseResult<T>> {
    const options: IRequestOptions = {
      method: RequestMethod.Get,
      params,
    }

    return this.api.makeRequest<T>(`${this.buildFullPath()}/${id}`, options)
  }

  // todo: make more clear type
  delete(id: number, params: IRequestParams): Promise<IResponseResult<never>> {
    const options: IRequestOptions = {
      method: RequestMethod.Delete,
      params,
    }

    return this.api.makeRequest<never>(`${this.buildFullPath()}/${id}`, options)
  }

  list(params?: IRequestParams): Promise<IResponseResult<T>> {
    const options: IRequestOptions = {
      method: RequestMethod.Get,
      params,
    }

    return this.api.makeRequest<T>(this.buildFullPath(), options)
  }

  update(id: (number | string), entity: T): Promise<IResponseResult<T>> {
    const options: IRequestOptions = {
      method: RequestMethod.Put,
      body: entity as unknown as object,
    }

    return this.api.makeRequest<T>(`${this.buildFullPath()}/${id}`, options)
  }

  protected buildFullPath() {
    return `${this.basePath}/${this.path}`
  }
}

export default BaseApi

import ApiService from 'services/api.service'
import AuthApi from './AuthApi'

const api = new ApiService()

export const authApi = new AuthApi(api)

export default api

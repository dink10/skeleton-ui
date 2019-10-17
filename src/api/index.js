import Client from './Client'
import * as services from './services'

const BASE_PATH = '/api'

const client = new Client(BASE_PATH)

const servicesInstance = Object.entries(services).reduce((acc, [servName, Service]) => ({
  ...acc,
  [servName]: new Service(client),
}), {})

export default {
  services: servicesInstance,
  customRequest: client.do,
}

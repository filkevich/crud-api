import Service from './service'
import { TRoutes } from './interfaces'

const DEFAULT_HEADER = { 'content-type': 'application/json' }

const routes: TRoutes = {
  '/api/users:get': async (res) => {
    const users = await Service.getUsers()

    res.writeHead(200, DEFAULT_HEADER)
    res.write(JSON.stringify(users))
    return res.end()
  },

  '/api/users/id:get': async (res) => {

    res.writeHead(200, DEFAULT_HEADER)
    res.write(JSON.stringify({message: 'user by id'}))
    return res.end()
  },

  default: async (res) => {
    const message = { message: 'There is no such endpoint' }
    const json = JSON.stringify(message)

    res.writeHead(404, DEFAULT_HEADER)
    res.write(json)

    return res.end()
  }
}

export default routes

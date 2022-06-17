import Service from './service'
import { TRoutes } from './types'

const DEFAULT_HEADER = { 'content-type': 'application/json' }

const routes: TRoutes = {
  '/api/users:get': async ({ res }) => {
    const users = await Service.getUsers()

    res.writeHead(200, DEFAULT_HEADER)
    res.write(JSON.stringify(users))
    return res.end()
  },

  '/api/users/id:get': async ({ res, id }) => {
    if (typeof id === 'string') {
      const userById = await Service.getUserById(id)

      if (userById) {
        res.writeHead(200, DEFAULT_HEADER)
        res.write(JSON.stringify({ data: userById }))
      }
      else {
        res.writeHead(404, DEFAULT_HEADER)
        res.write(JSON.stringify({ message: `User with ID ${id} doesn't exits` }))
      }
    }
    else {
      res.writeHead(400, DEFAULT_HEADER)
      res.write(JSON.stringify({ message: 'The ID is not valid' }))
    }


    return res.end()
  },

  '/api/users:post': async ({ res, req })  => {
    const newUser = await Service.createUser(req)

    res.writeHead(201, DEFAULT_HEADER)
    res.write(JSON.stringify({ data: newUser }))
    return res.end()
  },

  'default': async ({ res }) => {
    const message = { message: 'There is no such endpoint' }
    const json = JSON.stringify(message)

    res.writeHead(404, DEFAULT_HEADER)
    res.write(json)

    return res.end()
  }
}

export default routes

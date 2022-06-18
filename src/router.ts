import Service from './service'
import { TRoutes } from './types'
import { send } from './utils'

const routes: TRoutes = {
  '/api/users:get': async ({ res }) => {
    const { code, ...answer } = await Service.getUsers()
    send(code, answer, res)
  },

  '/api/users/id:get': async ({ res, id }) => {
    const { code, ...answer } = await Service.getUserById(id)
    send(code, answer, res)
  },

  '/api/users:post': async ({ res, req })  => {
    const { code, ...answer } = await Service.createUser(req)
    send(code, answer, res)
  },

  'default': async ({ res }) => {
    const answer = {
      success: false,
      data: null,
      errMsg: 'There is no such endpoint'
    }

    send(404, answer, res)
  }
}

export default routes

import { getUsers, getUserById, createUser, updateUser, deleteUser } from './service'
import { TRoutes } from './types'
import { send } from './utils'

const routes: TRoutes = {
  '/api/users:get': async ({ res }) => {
    const { code, ...answer } = await getUsers()
    send(code, answer, res)
  },

  '/api/users/id:get': async ({ res, id }) => {
    const { code, ...answer } = await getUserById(id)
    send(code, answer, res)
  },

  '/api/users:post': async ({ res, req }) => {
    const { code, ...answer } = await createUser(req)
    send(code, answer, res)
  },

  '/api/users/id:put': async ({ res, req, id }) => {
    const { code, ...answer } = await updateUser(req, id)
    send(code, answer, res)
  },

  '/api/users/id:delete': async ({ res, id }) => {
    const { code, ...answer } = await deleteUser(id)
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

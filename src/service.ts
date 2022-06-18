import { IncomingMessage } from 'http'
import { v4 as uuidv4 } from 'uuid'
import { TUser, TId, TValidateConfig } from './types'
import { getBodyFromReq, validateData } from './utils'

const users: Array<TUser> = [
  {
    id: '10',
    username: 'Artiom',
    age: 26,
    hobbies: ['music', 'coding']
  }
]

export default class Service {
  static async getUsers() {
    return {
      success: true,
      data: users,
      errMsg: null,
      code: 200
    }
  }

  static async getUserById(id: TId) {
    // !VALIDATION

    for (let user of users) {
      if (user.id === id) {
        return {
          success: true,
          data: user,
          errMsg: null,
          code: 200
        }
      }
    }

    return {
      success: false,
      data: null,
      errMsg: 'There is no user with such ID.',
      code: 404
    }
  }

  static async createUser(req: IncomingMessage) {
    const {success, data, errMsg } = await getBodyFromReq(req)

    if (!success) {
      return {
        code: 400,
        success,
        data,
        errMsg
      }
    }

    const validateConfig = {
      username: {
        isRequired: true,
        type: 'string'
      },
      age: {
        isRequired: true,
        type: 'number'
      },
      hobbies: {
        isRequired: true,
        type: 'array'
      }
    } as TValidateConfig

    const { isValid, validateErrMsg } = await validateData(data, validateConfig)

    if (!isValid) {
      return {
        code: 400,
        success: false,
        data,
        validateErrMsg
      }
    }

    const newUser = {
      id: uuidv4(),
      ...data
    }

    users.push(newUser)

    return { code: 200, success: true, data: newUser, errMsg: null }
  }
}

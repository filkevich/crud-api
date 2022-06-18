import { IncomingMessage } from 'http'
import { v4 as uuidv4, validate } from 'uuid'
import { TUser, TId, TValidateConfig } from './types'
import { getBodyFromReq, validateData } from './utils'

const users: Array<TUser> = []

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
    if (typeof id !== 'string') {
      return {
        success: false,
        data: null,
        errMsg: `Wrong type of id. Expected string instead of ${typeof id}.`,
        code: 400
      }
    }

    if (!validate(id)) {
      return {
        success: false,
        data: null,
        errMsg: `Wrong format of id. Expected uuid format.`,
        code: 400
      }
    }

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
    const {success: isGetBodySuccess, data, errMsg } = await getBodyFromReq(req)

    if (!isGetBodySuccess) {
      return {
        code: 400,
        success: false,
        data: null,
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
        data: null,
        validateErrMsg
      }
    }

    const newUser = {
      id: uuidv4(),
      ...data
    }

    users.push(newUser)

    return { code: 201, success: true, data: newUser, errMsg: null }
  }
}

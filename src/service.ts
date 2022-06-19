import { IncomingMessage } from 'http'
import { v4 as uuidv4 } from 'uuid'
import { TUser, TId, TValidateConfig, TUserUpdate } from './types'
import { getBodyFromReq, validateData, validateId, validatePutBody } from './utils'

let users: Array<TUser> = []

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
    const isIdValid = await validateId(id)

    if (!isIdValid) {
      return {
        success: false,
        data: null,
        errMsg: `The ID has wrong format. Expected UUID`,
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

  static async updateUser(req: IncomingMessage, id: TId) {
    const isIdValid = validateId(id)

    if (!isIdValid) {
      return {
        success: false,
        data: null,
        errMsg: `The ID has wrong format. Expected UUID`,
        code: 400
      }
    }

    const userByIdData = await this.getUserById(id)
    const { success, data: userById } = userByIdData

    if (!success || !userById) {
      console.log('success', success)
      console.log('userById', userById)
      console.log('workds')
      return userByIdData
    }

    const { success: isGetBodySuccess, data: userFromReq, errMsg } = await getBodyFromReq(req)

    if (!isGetBodySuccess) {
      return {
        code: 400,
        success: false,
        data: null,
        errMsg
      }
    }

    const { isValid: isPutBodyValid, validateErrMsg } = await validatePutBody(userById, userFromReq)

    if (!isPutBodyValid) {
      return {
        code: 400,
        success: false,
        data: null,
        errMsg: validateErrMsg
      }
    }

    let userToSend = {}

    users = users.map((user) => {
      if (user.id === id) {
        const updatedUser = {
          ...user,
          ...userFromReq
        }
        userToSend = updatedUser

        return updatedUser
      }
      return user
    })

    return {
      code: 200,
      success: true,
      data: userToSend,
      errMsg: null
    }
  }
}

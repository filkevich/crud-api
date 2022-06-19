import { IncomingMessage } from 'http'
import { v4 as uuidv4 } from 'uuid'
import { TUser, TId, TValidateConfig, TUserUpdate } from './types'
import { getBodyFromReq, validateData, validateId, validatePutBody } from './utils'

let users: Array<TUser> = []

const wrongIdType = {
  success: false,
  data: null,
  errMsg: `The ID has wrong format. Expected UUID`,
  code: 400
}

const noUserWithSuchId = {
  success: false,
  data: null,
  errMsg: 'There is no user with such ID.',
  code: 404
}

export const getUsers = async () => {
  return {
    success: true,
    data: users,
    errMsg: null,
    code: 200
  }
}

export const getUserById = async (id: TId) => {
  const isIdValid = await validateId(id)

  if (!isIdValid) {
    return wrongIdType
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

  return noUserWithSuchId
}

export const createUser = async (req: IncomingMessage) => {
  const {success: isGetBodySuccess, data, errMsg } = await getBodyFromReq(req)

  if (!isGetBodySuccess) {
    return {
      code: 500,
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

  return {
    code: 201,
    success: true,
    data: newUser,
    errMsg: null
  }
}

export const updateUser = async (req: IncomingMessage, id: TId) => {
  const isIdValid = validateId(id)

  if (!isIdValid) { return wrongIdType }

  const userByIdData = await getUserById(id)
  const { success, data: userById } = userByIdData

  if (!success || !userById) { return userByIdData }

  const { success: isGetBodySuccess, data: userFromReq, errMsg } = await getBodyFromReq(req)

  if (!isGetBodySuccess) {
    return {
      code: 500,
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

export const deleteUser = async (id: TId) => {
  const isIdValid = await validateId(id)

  if (!isIdValid) { return wrongIdType }

  let isIdExists = false
  users.map(user => {
    if (user.id === id) {
      isIdExists = true
    }
  })

  if (!isIdExists) { return noUserWithSuchId }

  users = users.filter(user => !(user.id === id))

  return {
    code: 204,
    success: true,
    data: users,
    errMsg: null,
  }
}

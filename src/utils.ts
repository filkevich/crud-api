import { parse } from 'url'
import { validate } from 'uuid'
import {
  TCustomParseUrlFn,
  TRemoveTralingSlashFn,
  TGetBodyFromReqFn,
  TParsedBody,
  TSend,
  TValidateBody,
  TId,
  TUserUpdate,
  TUser,
  TValidatePutBody
} from './types'

export const customParseUrl: TCustomParseUrlFn = async (url) => {
  const { pathname } = parse(url || '', true)
  const arrPathName = pathname?.split('/')

  if (arrPathName?.length === 4) {
    const id = arrPathName.pop()
    const path = arrPathName.join('/') + '/id'

    return { path, id }
  }

  return { path: pathname || '', id: undefined}
}

export const removeTrailingSlash: TRemoveTralingSlashFn = async (url) => {
  const hasTrailingSlash = url?.endsWith('/')

  return hasTrailingSlash ? url?.slice(0, -1) : url
}

export const getBodyFromReq: TGetBodyFromReqFn = async (req) => {
  let arr = [] as Buffer[]

  const body = await new Promise((resolve, reject) => {
    req.on('data', (chunk) => { arr.push(chunk) })
    req.on('end', () => {
      try {
        const body = Buffer.concat(arr).toString()
        const parsedBody = JSON.parse(body)
        resolve({
          success: true,
          data: parsedBody,
          errMsg: null,
        })
      }
      catch(err) {
        resolve({
          success: false,
          data: null,
          errMsg: 'Invalid json'
        })
      }

    })
    req.on('error', () => {
      resolve ({
        success: false,
        data: null,
        errMsg: 'Unexpected error while reading the body request'
      })
    })
  }) as TParsedBody

  return body
}

export const send: TSend = async (code, answer, res) => {
  const DEFAULT_HEADER = { 'content-type': 'application/json' }

  res.writeHead(code, DEFAULT_HEADER)
  res.write(JSON.stringify(answer))
  res.end()
}

export const validateData: TValidateBody = async (body, config) => {
  for (const prop in body) {
    if (!config.hasOwnProperty(prop)) {

      return {
        isValid: false,
        validateErrMsg: `The property '${prop}' is not needed.`
      }
    }
  }

  for (const prop in config) {
    if (config[prop].isRequired) {
      if (!body.hasOwnProperty(prop)) {

        return {
          isValid: false,
          validateErrMsg: `The property '${prop}' is required`
        }
      }
    }

    const isPropArray = typeof body[prop] === 'object' && Array.isArray(body[prop])
    const propType = isPropArray ? 'array' : typeof body[prop]
    const expectedType = config[prop].type

    if (propType !== expectedType) {
      return {
        isValid: false,
        validateErrMsg: `The property '${prop}' has wrong type. Expected ${expectedType} instead of ${propType}.`
      }
    }
  }

  return {
    isValid: true,
    validateErrMsg: null
  }
}

export const validateId = async (id: TId): Promise<boolean> => {
  if (typeof id !== 'string') {
    return false
  }

  if (!validate(id)) {
    return false
  }

  return true
}

export const validatePutBody:TValidatePutBody = async (userById, userFromReq) => {
  for (const prop in userFromReq) {
    if (!userById?.hasOwnProperty(prop)) {

      return {
        isValid: false,
        validateErrMsg: `The property '${prop}' doesn't exist.`
      }
    }

    if (typeof userFromReq[prop] !== typeof userById[prop]) {

      return {
        isValid: false,
        validateErrMsg: `Wrong value type of the property '${prop}'.`
      }
    }
  }

  return {
    isValid: true,
    validateErrMsg: null
  }
}
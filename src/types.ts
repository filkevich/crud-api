import { IncomingMessage, ServerResponse } from 'http'

export type TId = string | undefined
export type TUrl = string | undefined

export type TUser = {
  id: string,
  username: string,
  age: number,
  hobbies: string[]
}
export type TUserUpdate = {
  [key: string]: string | number | string[]
}

export type TRequestHandlerFn = (req: IncomingMessage, res: ServerResponse) => Promise<void>
export type TRemoveTralingSlashFn = (url: TUrl) => Promise<TUrl>
export type TCustomParseUrlFn = (url: TUrl) => Promise<{ path: string, id: TId }>

export type TRouteProps = {
  req: IncomingMessage,
  res: ServerResponse,
  id: TId,
}

export type TRoute = (props: TRouteProps) => Promise<void>
export type TRoutes = {
  [key: string]: TRoute
}

export type TParsedBody = {
  success: boolean,
  data: any,
  errMsg: string | null,
}
export type TGetBodyFromReqFn = (req: IncomingMessage) => Promise<TParsedBody>

export type TSend = (code: number, answer: any, res: ServerResponse) => Promise<void>

export type TIsValid = {
  isValid: boolean,
  validateErrMsg: string | null,
}

export type TValidateConfig = {
  [key: string]: {
    isRequired: boolean,
    type: 'string' | 'number' | 'array'
  }
}

export type TValidateBody = (body: any, config: TValidateConfig) => Promise<TIsValid>

export type TValidatePutBody = (userById: TUserUpdate, userFromReq: TUserUpdate) => Promise<TIsValid>
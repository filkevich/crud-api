import { IncomingMessage, ServerResponse } from 'http'

export type TId = string | null

export type TRequestHandlerFn = (req: IncomingMessage, res: ServerResponse) => Promise<ServerResponse>

export type TCustomParseUrlFn = (url: string | undefined) => Promise<{path: string, id: TId}>

export type TRoutes = {
  [key: string]: (res: ServerResponse, id: TId) => Promise<ServerResponse>
}

export interface TUser {
  id: number,
  username: string,
  age: number,
  hobbies: string[]
}
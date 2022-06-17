import { IncomingMessage, ServerResponse } from 'http'

export type TId = string | null
export type TUrl = string | undefined
export type TUser = {
  id: string,
  username: string,
  age: number,
  hobbies: string[]
}

export type TRequestHandlerFn = (req: IncomingMessage, res: ServerResponse) => Promise<ServerResponse>
export type TRemoveTralingSlashFn = (url: TUrl) => Promise<TUrl>
export type TCustomParseUrlFn = (url: TUrl) => Promise<{ path: string, id: TId }>

export type TRouteProps = {
  req: IncomingMessage,
  res: ServerResponse,
  id: TId,
}

export type TRoute = (props: TRouteProps) => Promise<ServerResponse>

export type TRoutes = {
  [key: string]: TRoute
}
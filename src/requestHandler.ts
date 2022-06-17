import { customParseUrlFn, removeTrailingSlash } from './utils'
import routes from './router'

import { TRequestHandlerFn } from './types'

const requestHandler: TRequestHandlerFn = async (req, res) => {
  const { method, url } = req
  const trimmedUrl = await removeTrailingSlash(url)
  const { path, id } = await customParseUrlFn(trimmedUrl)

  const key = `${path}:${method?.toLowerCase()}`
  const chosenRoute = routes[key] || routes.default

  const routeProps = { res, req, id }
  return await chosenRoute(routeProps)
}

export default requestHandler

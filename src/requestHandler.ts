import { customParseUrlFn } from './utils'
import routes from './router'

import { TRequestHandlerFn } from './interfaces'

const requestHandler: TRequestHandlerFn = async (req, res) => {
  const { method, url } = req
  const { path, id } = await customParseUrlFn(url)

  const key = `${path}:${method?.toLowerCase()}`
  console.log(key)
  const chosenRoute = routes[key] || routes.default

  return await chosenRoute(res, id)
}

export default requestHandler

import { parse } from 'url'
import { TCustomParseUrlFn } from './interfaces'

export const customParseUrlFn: TCustomParseUrlFn = async (url) => {
  const { pathname } = parse(url || '', true)
  const arrPathName = pathname?.split('/')

  if (arrPathName?.length === 4) {
    const id = arrPathName.pop()
    const path = arrPathName.join('/') + '/id'

    return { path, id: id || null }
  }

  return { path: pathname || '', id: null}
}

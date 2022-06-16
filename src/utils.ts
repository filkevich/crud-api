import { parse } from 'url'
import { TCustomParseUrlFn, TRemoveTralingSlashFn } from './types'

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

export const removeTrailingSlash: TRemoveTralingSlashFn = async (url) => {
  const hasTrailingSlash = url?.endsWith('/')

  return hasTrailingSlash ? url?.slice(0, -1) : url
}
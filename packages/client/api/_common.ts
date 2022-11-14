import { ERR_CODE_OK, ERR_CODE_SERVER } from '~/constant'
import { isNotVoid } from '~/shared'

export const authInterceptor = (config) => {
  const headers: Record<string, any> = config.headers || {}
  const params: any = config.params || {}

  // let token

  // if (isServer()) {
  //   token = window.localStorage.getItem(APP_TOKEN)
  // }

  // if (token && !headers['Authorization']) {
  //   headers['Authorization'] = decodeToken(token)
  // }

  config.params = params
  config.headers = headers

  return config
}

export function isServerError(res?: { message: string; code: number }) {
  if (!res || res.code !== ERR_CODE_SERVER) return false
  res.message = res.message || ''
  return res.message.includes('Null') || res.message.includes('SQL')
}

export async function normalizeRes(res: any, config?) {
  try {
    res = await res
  } catch (err) {
    // @ts-ignore
    let message = err.message
    if (isNotVoid(message)) {
      message = 'Unknown error'
    }

    return Promise.reject(message)
  }
  if (res.code !== ERR_CODE_OK) {
    if (isServerError(res)) {
      console.error('server error :', res.message, config)
      return Promise.reject(new Error('Server Error'))
    }
    return Promise.reject(new Error(res.message || 'Unknown error'))
  }
  return res.data
}

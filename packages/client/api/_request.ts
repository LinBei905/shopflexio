import axios, { AxiosRequestConfig } from 'axios'

import { BASE_URL, DEFAULT_TIMEOUT } from '~/constant'

import { authInterceptor, normalizeRes } from './_common'

export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  timeout: DEFAULT_TIMEOUT,
})

http.interceptors.request.use(authInterceptor)
// http.interceptors.request.use((config) => {})

http.interceptors.response.use((res) => {
  const data = res.data
  // if (data.code === ERR_UNAUTHORIZATION && isServer()) {
  //   window.localStorage.removeItem(APP_TOKEN)
  // }

  return normalizeRes(data, res.config)
})

export function get<R = any, P = any>(
  endpoint: string,
  params?: P,
  config: AxiosRequestConfig = {},
) {
  params = params || ({} as any)
  return http.get(endpoint, {
    ...config,
    params: {
      ...(config.params || {}),
      ...params,
    },
  }) as Promise<R>
}

export function post<R = any, P = any>(
  endpoint: string,
  params?: P,
  config: AxiosRequestConfig = {},
) {
  params = params || ({} as any)
  return http.post(endpoint, params, config) as Promise<R>
}

export function destroy<R = any, P = any>(
  endpoint: string,
  params?: P,
  config: AxiosRequestConfig = {},
) {
  params = params || ({} as any)
  return http.delete(endpoint, {
    ...config,
    params: {
      ...(config.params || {}),
      ...params,
    },
  }) as Promise<R>
}

export const remove = destroy

export function put<R = any, P = any>(
  endpoint: string,
  params?: P,
  config: AxiosRequestConfig = {},
) {
  params = params || ({} as any)
  return http.put(endpoint, params, config) as Promise<R>
}

/**
 * 用户接收文件传输
 */
export const httpExport = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Access-Control-Expose-Headers': 'Content-Disposition',
  },
  responseType: 'blob',
})

httpExport.interceptors.request.use(authInterceptor)

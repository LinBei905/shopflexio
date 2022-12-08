import promiseCache from 'promise-memoize'

import { get, http } from './_request'

export async function getSupportedPlatform() {
  return get('/flow/platforms')
}

export function sendMessage(params: {
  shop?: string
  email: string
  phone?: string
  question: string
}) {
  return http.post(`/auth/common/question`, params)
}

export function getDataFromKeyValueStore(key: string, defaultVal: object | Array<any> = {}) {
  return get(`/config/kv/get?key=${key}`).then((res) => {
    res = res || {}
    try {
      return JSON.parse(res)
    } catch (err) {
      return defaultVal
    }
  })
}

export function sendBookRequest(params: {
  email: string
  phone?: string
  question?: string
}) {
  return http.post(`/auth/common/question`, params)
}

export const getUseCasesSteps = () =>
  getDataFromKeyValueStore('AP__USE_CASES__V1').then((res) => res?.steps || [])

const _getBlogData = () => getDataFromKeyValueStore(`IO_BLOG_V1`)
export const getBlogData = promiseCache(_getBlogData, {
  maxAge: 60 * 1000,
})

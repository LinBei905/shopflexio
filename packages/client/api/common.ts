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

export const getUseCasesSteps = () =>
  getDataFromKeyValueStore('AP__USE_CASES__V1').then((res) => res?.steps || [])

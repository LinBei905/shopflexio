import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from 'change-case'
// import pickDeep from 'deepdash-es/pickDeep'
import merge from 'lodash.merge'
// import { isObject, isString } from 'lodash'
import { nanoid } from 'nanoid'
// import { JsonObject, JsonValue } from 'type-fest'
// import urlJoin from 'url-join'

const emailRE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export const isEmail = (val: string) => emailRE.test(val)
export { default as omit } from 'lodash.omit'

export const isVoid = (v: unknown) => v === null || v === undefined || v === ''
export const isUndef = (v: unknown): v is undefined | null => v == null
export const isDef = (v: unknown) => v != null
export const isNotVoid = (v: unknown) => !isVoid(v)
// export { default as urlJoin } from 'url-join'
export const encodeToken = (token: string) => {
  return token
}
export const isPlainObject = (o) => Object.prototype.toString.call(o) === '[object Object]'
export const isNumber = (v: unknown): v is number => typeof v === 'number'

export const decodeToken = (encodedToken: string) => {
  return encodedToken
}

export const isTrue = (v: unknown): boolean => {
  return v === true || v === 'true'
}

export const isFalse = (v: unknown): boolean => {
  return v === false || v === 'false'
}

export const isString = (v: unknown): v is string => typeof v === 'string'
export const isFunction = (v: unknown): v is Function => typeof v === 'function'
export const isObject = (v: unknown): v is object => typeof v === 'object' && v !== null

export const freeze = <T>(v: T): T => {
  if (isObject(v)) {
    return Object.freeze(v)
  }
  return v
}

export function traverse<T extends Record<string, any>>(
  object: T,
  fn: (key: string, value: T[keyof T], target: T) => any,
) {
  if (!isObject(object)) return
  Object.keys(object).forEach((key) => fn(key, object[key], object))
}

export function nextTick(fn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        return resolve(fn())
      } catch (err) {
        return reject(err)
      }
    })
  })
}

export function getId(options: { prefix?: string; suffix?: string; count?: number } = {}) {
  const { prefix = '', suffix = '', count } = options
  return `${prefix}${nanoid(count)}${suffix}`
}

export function toArray<R>(data: R): R extends Array<any> ? R : [R] {
  if (!data) return [] as any

  if (!Array.isArray(data)) return [data] as any
  return data as any
}

/**
 * @example {1: {a: 1}, 2: {b: 1}} => [{a: 1}, {b: 1}]
 */
export const objectToArray = <T extends Record<string, any>, V extends T[string] = T[string]>(
  obj: T,
  options: { key?: string; value?: string } = {},
): V[] => {
  if (!isObject(obj)) return []
  const { key = 'key', value = 'value' } = options
  const res: any[] = []
  const keys = Object.keys(obj)

  for (let i = 0; i < keys.length; i++) {
    const _key = keys[i]
    const _value = obj[_key]

    res.push({
      [key]: _key,
      [value]: _value,
    })
  }

  return res
}

type TextCase =
  | 'upperCase'
  | 'lowerCase'
  | 'camelCase'
  | 'capitalCase'
  | 'constantCase'
  | 'dotCase'
  | 'headerCase'
  | 'noCase'
  | 'paramCase'
  | 'pascalCase'
  | 'pathCase'
  | 'sentenceCase'
  | 'snakeCase'

/**
 * @param { string } text
 * @param { import('@/@types').TextCase | import('@/@types').TextCase[]} type
 */
export function changeCase(text, type: TextCase | TextCase[]): string {
  if (!type || !isString(text)) return text
  type = Array.isArray(type) ? type : [type]
  return type.reduce((prev, curr) => _changeCase(prev, curr), text)
}

function _changeCase(text, type = '') {
  let method = (a) => a
  switch (type) {
    case 'camelCase':
      method = camelCase
      break
    case 'capitalCase':
      method = capitalCase
      break
    case 'constantCase':
      method = constantCase
      break
    case 'dotCase':
      method = dotCase
      break
    case 'headerCase':
      method = headerCase
      break
    case 'noCase':
      method = noCase
      break
    case 'paramCase':
      method = paramCase
      break
    case 'pascalCase':
      method = pascalCase
      break
    case 'pathCase':
      method = pathCase
      break
    case 'sentenceCase':
      method = sentenceCase
      break
    case 'snakeCase':
      method = snakeCase
      break
    case 'upperCase':
      method = (t) => t.toUpperCase()
      break
    case 'lowerCase':
      method = (t) => t.toLowerCase()
      break
  }

  return method(text)
}

export function toJsonString(data: any, fallbackValue = ''): string {
  try {
    return isObject(data) ? JSON.stringify(data) : data
  } catch (err) {}
  return fallbackValue
}

export function clearVoidKey(obj): any {
  if (!isPlainObject(obj)) {
    return {}
  }

  return Object.keys(obj).reduce((prev, key) => {
    const value = obj[key]
    if (isNotVoid(value) && !Number.isNaN(value)) {
      prev[key] = value
    }
    return prev
  }, {})
}

export const isEmptyObject = (v: any) => isObject(v) && Object.keys(v).length === 0

export function stringToArray(
  strOrArray: string | Array<any>,
  options: {
    splitter?: string
    trim?: boolean
  } = {},
) {
  const { splitter = ',', trim = false } = options
  const arr = Array.isArray(strOrArray) ? strOrArray : strOrArray.split(splitter)

  return trim ? arr.map((item) => (isString(item) ? item.trim() : item)) : arr
}

interface ToObjectMapOptions {
  key?: ((item: any) => string) | string
  reserveOrigin?: boolean
  freeze?: boolean
  reserveOriginKey?: string
}

/**
 * @default {freeze=true}
 * @default {key='id'}
 * @default {reserveOrigin=true}
 * @default {reserveOriginKey='__list__'}
 */
export function toObjectMap<T extends any[] = any[]>(
  arr: T,
  options: ToObjectMapOptions = {},
): {
  __list__?: T
} & { [key in string]: T[number] } {
  const {
    key: _key = 'id',
    reserveOrigin = true,
    freeze = true,
    reserveOriginKey = '__list__',
  } = options
  if (!Array.isArray(arr)) {
    return {
      [reserveOriginKey]: arr,
    }
  }

  const res = arr.reduce((prev, curr) => {
    const key = isFunction(_key) ? _key(curr) : _key

    prev[curr[key]] = freeze ? Object.freeze(curr) : curr
    return prev
  }, Object.create(null)) as any

  if (reserveOrigin) {
    // res[reserveOriginKey] = arr
    Object.defineProperty(res, reserveOriginKey, {
      get: () => arr,
      enumerable: false,
    })
  }
  return freeze ? Object.freeze(res) : res
}

/**
 * 处理：[].find() =>  undefined | target
 */
export const toObjectResult = <T = any>(o): T | null => (o == null ? null : o)

export function shallowMerge(obj1: object, ...objs: object[]) {
  return Object.assign({}, obj1, ...objs)
}

export function deepMerge(...objs: object[]) {
  return merge({}, ...objs)
}

/**
 * reduce an array to object
 * @example [{key: 'k1', value: 'v1'}] => {k1: 'v1'}
 */
export function arrayToObject(arr: any[], options: { key?: string; value?: string } = {}) {
  const { key = 'key', value = 'value' } = options
  const res: object = {}

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const _key = item[key]
    const _value = item[value]

    res[_key] = _value
  }

  return res
}

/**
 *
 */
export function skipElementByIndex(arr: any[], indexes: number | number[]) {
  let _indexes: any[] = Array.isArray(indexes) ? indexes : [indexes]

  return arr.filter((_, index) => _indexes.includes(index) == false)
}

export function parse(jsonStr: string, onFallback?: ((err: unknown) => any) | string) {
  if (!isString(jsonStr)) return jsonStr
  try {
    return JSON.parse(jsonStr)
  } catch (err) {
    if (isString(onFallback)) return onFallback
    onFallback = onFallback || (() => ({}))
    return onFallback(err)
  }
}

export function isServer() {
  return isClient() == false
}

/* eslint-disable no-console */
interface Options {
  log?: boolean
  warn?: boolean
  error?: boolean
  verbose?: boolean
}

export const createLogger = (namespace: string, options: Options = {}) => {
  const { warn = true, error = true, log = process.env.NODE_ENV !== 'production' } = options

  return {
    log(...args: any[]) {
      log && console.info(`[${new Date().toLocaleString()} shopflex - ${namespace}]: \n`, ...args)
    },
    warn(...args: any[]) {
      warn && console.warn(`[${new Date().toLocaleString()} shopflex - ${namespace}]: \n`, ...args)
    },
    error(...args: any[]) {
      error &&
        console.error(`[${new Date().toLocaleString()} shopflex - ${namespace}]: \n`, ...args)
    },
  }
}

export const logger = createLogger('debug')
export const isClient = () => typeof window !== 'undefined'

// export function isMobile() {
//   if (isClient()) return false
//   const flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//     window.navigator.userAgent,
//   )
//   return flag
// }

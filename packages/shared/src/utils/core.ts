import { JsonObject, JsonValue } from 'type-fest'
import pickDeep from 'deepdash-es/pickDeep'
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

// import { isObject, isString } from 'lodash'

import { nanoid } from 'nanoid'
import urlJoin from 'url-join'
import merge from 'lodash.merge'

const emailRE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export const isEmail = (val: string) => emailRE.test(val)
export { default as omit } from 'lodash.omit'

export const isVoid = (v: unknown) => v === null || v === undefined || v === ''
export const isUndef = (v: unknown): v is undefined | null => v == null
export const isDef = (v: unknown) => v != null
export const isNotVoid = (v: unknown) => !isVoid(v)
export { default as urlJoin } from 'url-join'
export const encodeToken = (token: string) => {
  return token
}
export const isPlainObject = (o) =>
  Object.prototype.toString.call(o) === '[object Object]'
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
export const isObject = (v: unknown): v is object =>
  typeof v === 'object' && v !== null

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

export function getId(
  options: { prefix?: string; suffix?: string; count?: number } = {},
) {
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
export const objectToArray = <
  T extends Record<string, any>,
  V extends T[string] = T[string]
>(
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

export function getLocation(
  options: {
    path?: string
    query?: Record<string, string>
    params?: string[]
  } = {},
) {
  const { query = {}, params = [], path = '' } = options
  let _params = params.join('/')
  _params = _params.startsWith('/') ? _params.substring(1) : _params
  let _query = Object.keys(query).reduce((prev, curr, index) => {
    return index === 0
      ? `${prev}${curr}=${query[curr]}`
      : `${prev}&${curr}=${query[curr]}`
  }, '')
  let _path = path || window.location.origin
  const questionMaskIndex = _path.indexOf('?')

  if (questionMaskIndex !== -1) {
    _query = `${_path.substring(questionMaskIndex)}${
      _path.endsWith('&') ? '' : '&'
    }${_query}`
    _path = _path.substring(0, questionMaskIndex)
  }

  _query = _query.startsWith('?') ? _query : `?${_query}`
  // console.log('query: ', _query)
  return urlJoin(_path, _params, _query)
}

export function isLooseEqual(a: string | number, b: string | number) {
  return a === b || String(a) === String(b)
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

export function encryptEmail(email: string) {
  if (!email) return ''
  if (email.includes('@')) {
    let [left, right] = email.split('@')
    if (!left) return email
    let encrypted = ''
    if (left.length >= 5) {
      for (let i = 0; i < left.length; i++) {
        if (i < 2 || i >= left.length - 2) {
          encrypted += left[i]
        } else {
          encrypted += '*'
        }
      }
    } else {
      encrypted = `${left[0]}**${left[left.length - 1]}`
    }

    return `${encrypted}@${right}`
  }

  return email
}
export const isEmptyObject = (v: any) =>
  isObject(v) && Object.keys(v).length === 0

export const delay = <Fn extends (...args: any[]) => any>(
  fn: Fn | null,
  time = 200,
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (fn) resolve(fn())
        else resolve('')
      } catch (err) {
        reject(err)
      }
    }, time)
  })
}

export function cleanNullKey<O extends object = {}>(obj: O) {
  if (!isObject(obj)) return obj
  return Object.keys(obj).reduce((prev, key) => {
    if (obj[key] != null) {
      prev[key] = obj[key]
    }
    return prev
  }, {} as any)
}

function _traverse(
  obj: Record<any, any>,
  path: string,
  paths: string[],
  seen: Set<any>,
  skipArray: boolean,
) {
  if (!isObject(obj)) return
  if (seen.has(obj)) return

  seen.add(obj)
  if (Array.isArray(obj)) {
    paths.push(path)
    if (skipArray) return

    obj.forEach((item, index) => {
      _traverse(item, `${path}[${index}]`, paths, seen, skipArray)
    })
    return
  }

  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    _traverse(value, path ? `${path}.${key}` : key, paths, seen, skipArray)
  })
}

// find key which value is an any inside an object.
// Ex: { data: [] }  => ['data']
//     { id: 1, data: { list: [] } } => ['data.list']
//     { id: 1, data: { list: [ {id: 1, name: 'name' }, { id: 2, list: [] } ] } } => ['data.list', 'data.list[1].list']
export function findList(obj: Record<any, any>, skipArray = true): string[] {
  const paths = []
  _traverse(obj, '', paths, new Set(), skipArray)
  return paths
}

export function stringToArray(
  strOrArray: string | Array<any>,
  options: {
    splitter?: string
    trim?: boolean
  } = {},
) {
  const { splitter = ',', trim = false } = options
  const arr = Array.isArray(strOrArray)
    ? strOrArray
    : strOrArray.split(splitter)

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

export const noop = (...args: any[]) => {}
export const noopResolve = (...args: any[]) => Promise.resolve()
export const noopReject = (...args: any[]) => Promise.resolve()
export const once = function <Fn extends (...args: any[]) => any>(fn: Fn): Fn {
  let called = false
  const wrapper = function () {
    if (called) return
    called = true
    return fn.apply(this, arguments)
  }
  return wrapper as Fn
}

export const deepTraverse = <T = any>(
  v: T,
  fn: (
    key: string | number | null,
    value: any,
    path: string[],
    target: T,
  ) => void,
  path: string[] = [],
  seen = new Set(),
) => {
  if (!isObject(v) || seen.has(v)) return
  seen.add(v)

  if (Array.isArray(v)) {
    v.forEach((item, index) => {
      fn(index, item, path, v)
      deepTraverse(item, fn, [...path, index + ''], seen)
    })
  } else {
    for (const key in v) {
      const _path = [...path, key]
      fn(key, v[key], _path, v)
      deepTraverse(v[key] as any, fn, _path, seen)
    }
  }
}

function extract(obj, properties) {
  return properties.reduce(function (prev, p) {
    if (Array.isArray(p)) {
      prev[p[0]] = extract(obj[p[0]], p[1])
    } else if (
      obj !== undefined &&
      obj !== null &&
      Object.prototype.hasOwnProperty.call(obj, p)
    ) {
      prev[p] = obj[p]
    }
    return prev
  }, {})
}
export const jsonSearch = (
  json: JsonValue,
  fieldName: string | RegExp | string[],
) => {
  if (!fieldName || !isObject(json)) return json
  if (isString(fieldName)) {
    const lowerCase = fieldName.toLowerCase()
    fieldName = [
      lowerCase,
      changeCase(lowerCase, 'camelCase'),
      changeCase(lowerCase, 'snakeCase'),
      changeCase(lowerCase, 'capitalCase'),
    ]
  }
  return pickDeep(json, fieldName, { checkCircular: true })
}

// /**
//  * Increase string a value with unit
//  * @see https://github.com/vueuse/vueuse/blob/main/packages/shared/utils/index.ts
//  *
//  * @example '2px' + 1 = '3px'
//  * @example '15em' + (-2) = '13em'
//  */
// export function increaseWithUnit(target: number, delta: number): number
// export function increaseWithUnit(target: string, delta: number): string
// export function increaseWithUnit(
//   target: string | number,
//   delta: number,
// ): string | number
// export function increaseWithUnit(
//   target: string | number,
//   delta: number,
// ): string | number {
//   if (typeof target === 'number') return target + delta
//   const value = target.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || ''
//   const unit = target.slice(value.length)
//   const result = parseFloat(value) + delta
//   if (Number.isNaN(result)) return target
//   return result + unit
// }

export function toCssSize(target: number | string, defaultUnit: string = 'px') {
  if (isNumber(target)) {
    return target === 0 ? '0' : `${target}${defaultUnit}`
  }
  const value = target.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || ''
  const unit = target.slice(value.length)
  const result = parseFloat(value)
  if (unit) return target
  // if (Number.isNaN(result)) return `${}`
  return Number.isNaN(result) ? '0' : `${result}${defaultUnit}`
}

export const shallowEqual = (v1, v2): boolean => {
  if (v1 == v2) return true
  const isObject1 = isObject(v1)
  const isObject2 = isObject(v2)
  if (isObject1 !== isObject2) return false
  const isArray1 = Array.isArray(v1)
  const isArray2 = Array.isArray(v2)
  if (isArray1 !== isArray2) return false
  for (const key in v1) {
    if (v1[key] != v2[key]) return false
  }

  return true
}

export const objectChangeCase = <T extends Record<string, any>>(
  obj: T,
  cases: TextCase | TextCase[],
) => {
  return Object.keys(obj).reduce((prev, key) => {
    prev[changeCase(key, cases)] = obj[key]
    return prev
  }, {})
}

/**
 * 处理：[].find() =>  undefined | target
 */
export const toObjectResult = <T = any>(o): T | null => (o == null ? null : o)

// The Add commas function
const addCommas = (num: any) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Remove Non Numeric function
const removeNum = (num: any) => {
  return num.toString().replace(/[^0-9]/g, '')
}

export const numberFormatter = {
  // The convert section
  convert: function (num: number) {
    if (Math.abs(num) > 999.999 && Math.abs(num) < 999999.999) {
      return (Math.sign(num) * (Math.abs(num) / 1000)).toFixed() + 'k'
    } else if (Math.abs(num) > 999999.999 && Math.abs(num) < 999999999.999) {
      return (Math.sign(num) * (Math.abs(num) / 1000000)).toFixed() + 'M'
    } else if (
      Math.abs(num) > 999999999.999 &&
      Math.abs(num) < 999999999999.999
    ) {
      return (Math.sign(num) * (Math.abs(num) / 1000000000)).toFixed() + 'B'
    } else if (Math.abs(num) > 999999999999.999) {
      return (Math.sign(num) * (Math.abs(num) / 1000000000000)).toFixed() + 'T'
    } else {
      return Math.sign(num) * Math.abs(num)
    }
  },

  // The Strict add function
  strictAddComma: function (data: number | string) {
    return addCommas(removeNum(data))
  },

  // The Add Comma function
  addComma: function (num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },

  // The Remove Comma function
  removeComma: function (num: string) {
    return parseInt(num.toString().replace(/\,/g, ''))
  },

  // The Strict Remove function
  strictRemoveComma: function (num: string) {
    return parseInt(num.toString().replace(/[^0-9]/g, ''))
  },
}

export function hasElement(mayBeArray: Array<any> | null) {
  return Array.isArray(mayBeArray) && mayBeArray.length != 0
}

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
export function arrayToObject(
  arr: any[],
  options: { key?: string; value?: string } = {},
) {
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

import { nanoid } from 'nanoid'
import { isPlainObject } from './core'

/**
 * @param { {en?: string, zh?: string } } item
 * @param { import("@/@types/email/_base").SupportedLocale } locale
 * @param { { replaceId?: boolean, count?: number, defaultVal?: string } } options
 * @returns { string }
 */
export const t3 = (item = {}, locale = 'en', options: any = {}) => {
  if (!isPlainObject(item)) return item
  const { replaceId, count = 4, defaultVal } = options
  let res = item[locale] || defaultVal || item['en']
  if (!replaceId) return res

  return res.replace(`{{id}}`, nanoid(count))
}

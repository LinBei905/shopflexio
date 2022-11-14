import { computed, reactive, useContext, watch } from '@nuxtjs/composition-api'

// import { isString, isVoid } from '@shopflex-automation/shared'
import { I18N_LOCALE } from '~/constant'
import { isString, isVoid, parse } from '~/shared'

export const useI18n = () => {
  const ctx = useContext()
  const i18n = ctx.i18n
  const t2 = (en: string, zh?: string) => {
    return i18n.locale === 'zh' ? zh || en : en
  }

  const currentLanguage = computed(() => i18n.locale)
  const supportedLanguages = [
    { name: 'English', shortName: 'En', value: 'en' },
    { name: '中文简体', shortName: '中', value: 'zh' },
  ]

  const $t = i18n.t.bind(i18n)
  const $d = i18n.d.bind(i18n)

  /**
   * @param maybeI18nString
   * @example {en: 'xx', zh: '错错'} => 'xx'
   * @example JSON.stringify({en: 'xx', zh: '错错'}) => 'xx'
   * @example 'xx' => 'xx'
   */
  const $p = (maybeI18nString: string) => {
    if (!maybeI18nString) return maybeI18nString
    const res = parse(maybeI18nString, maybeI18nString)
    return $t3(res)
  }

  const langs = reactive([
    {
      value: 'en',
      label: 'English',
    },
    {
      value: 'zh',
      label: '中文简体',
    },
  ])

  /**
   * @type { import('@vue/composition-api').ComputedRef<import('@/@types/email/_base').SupportedLocale> }
   */
  const locale = computed(() => i18n.locale)
  const isEn = computed(() => locale.value === 'en' || isVoid(locale.value))
  const isZh = computed(() => locale.value === 'zh')

  const $t3 = (item: { en?: string; zh?: string } = {}) => {
    return isString(item) ? item : isZh.value ? item.zh || item.en : item.en
  }

  const setLocale = (locale: string) => i18n.setLocale(locale)
  watch(locale, (locale) => {
    if (locale) window.localStorage.setItem(I18N_LOCALE, locale)
    else window.localStorage.removeItem(I18N_LOCALE)
  })

  return {
    locale,
    i18n,
    supportedLanguages,
    currentLanguage,
    langs,
    isEn,
    isZh,
    $t,
    $t2: t2,
    t2,
    $t3,
    $d,
    setLocale,
    $p,
  }
}

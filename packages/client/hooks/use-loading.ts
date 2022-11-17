/* eslint-disable no-console */
import { ref } from '@nuxtjs/composition-api'
import { Message } from 'element-ui'

import { isFunction } from '~/shared'

interface Options {
  withMsg?: boolean
  successMsg?: string
  errorMsg?: string | ((err: Error) => any)
  config?: Partial<Parameters<typeof Message['success']>['0']>
  catchable?: boolean
}

export const useLoading = (initValOrOptions: boolean | Options = false, _options: Options = {}) => {
  let _loading = false
  if (typeof initValOrOptions === 'object') {
    _options = { ...initValOrOptions, ..._options }
  } else {
    _loading = initValOrOptions
  }

  const isLoading = ref(_loading)

  const run = <T>(promise: Promise<T>, options: Options = {}): Promise<T> => {
    const { config: _config = {} } = _options
    // console.log('_options: ', _options)
    const { withMsg = true, successMsg = 'Success', errorMsg, config = {}, catchable = false } = {
      ..._options,
      ...options,
    }
    if (!promise) {
      // eslint-disable-next-line no-console
      if (catchable) {
        console.warn(`useLoading error: params is not a promise`)
        return Promise.resolve() as any
      } else {
        console.error(`useLoading error: params is not a promise`)
        return Promise.reject(new Error(`Unknown error`))
      }
    }

    const mergedConfig = {
      ..._config,
      ...config,
    }
    // console.log('mergedConfig: ', mergedConfig)

    isLoading.value = true
    // @ts-ignore
    promise = promise
      .then((val) => {
        isLoading.value = false
        if (withMsg && successMsg) {
          Message.success({
            message: successMsg,
            ...mergedConfig,
          })
        }
        return val
      })
      .catch((e) => {
        isLoading.value = false
        if (withMsg) {
          if (isFunction(errorMsg)) {
            Message.error({
              // @ts-ignore
              message: errorMsg(e),
              ...mergedConfig,
            })
          } else {
            Message.error({
              message: errorMsg || e.message,
              ...mergedConfig,
            })
          }
        }
        if (!options.catchable) throw e
        console.error('(catchable)useLoading error: ', e)
      })
    return promise
  }

  return {
    isLoading,
    run,
  }
}

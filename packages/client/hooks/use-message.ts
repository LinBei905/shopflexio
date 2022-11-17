import { Message } from 'element-ui'

import { isString } from '~/shared'

type O = Parameters<typeof Message['success']>['0']

interface Options extends Partial<O> {}

export function useMessage() {
  const success = (options: Options | string = {}) => {
    options = isString(options) ? { message: options } : options
    const { message = 'Success' } = options
    options = { ...options, message }
    Message.success(options as any)
  }

  const warning = (options: Options | string = {}) => {
    options = isString(options) ? { message: options } : options
    const { message = 'Warning' } = options
    options = { ...options, message }
    Message.warning(options as any)
  }

  const error = (options: Options | string = {}) => {
    options = isString(options) ? { message: options } : options
    const { message = 'Error' } = options
    options = { ...options, message }
    Message.error(options as any)
  }
  const info = (options: Options | string = {}) => {
    options = isString(options) ? { message: options } : options
    const { message = 'Info' } = options
    options = { ...options, message }
    Message.info(options as any)
  }
  return {
    success,
    warning,
    error,
    info,
  }
}

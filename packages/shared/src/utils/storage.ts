export interface StorageOption {
  type?: 'local' | 'session'
  prefix?: string
  suffix?: string
}

export class MyStorage {
  private options: Required<StorageOption>
  private storage: globalThis.Storage

  constructor(options: StorageOption = {}) {
    this.init(options)
  }

  private init(options: StorageOption) {
    const { type = 'local', prefix = '', suffix = '' } = options
    if (type == 'local') {
      this.storage = window.localStorage
    } else {
      this.storage = window.sessionStorage
    }

    this.options = {
      type,
      prefix,
      suffix,
    }

    this.bind()
  }

  private bind() {
    this.getItem = this.getItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.setItem = this.setItem.bind(this)

    this.getItemSync = this.getItemSync.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.setItemSync = this.setItemSync.bind(this)
  }

  private getTargetKey(key: string) {
    const { prefix, suffix } = this.options
    return `${prefix}${key}${suffix}`
  }

  getItem(key: string): Promise<string | null> {
    return Promise.resolve().then(() => {
      return this.storage.getItem(this.getTargetKey(key))
    })
  }

  removeItem(key: string): Promise<void> {
    return Promise.resolve().then(() => {
      return this.storage.removeItem(key)
    })
  }

  setItem(key: string, value: string): Promise<void> {
    return Promise.resolve().then(() => {
      return this.storage.setItem(this.getTargetKey(key), value)
    })
  }

  getItemSync(key: string): string | null {
    return this.storage.getItem(this.getTargetKey(key))
  }

  removeItemSync(key: string): void {
    return this.storage.removeItem(key)
  }

  setItemSync(key: string, value: string): void {
    return this.storage.setItem(this.getTargetKey(key), value)
  }
}

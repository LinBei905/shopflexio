/***************************************
 * New feature: 2022-08-12
 ***************************************/
// 新增字段标识。
export type NewField<T, DefaultValue = any> = T
/***************************************
 * New feature: 2022-08-12
 ***************************************/
// 除了删除操作，其他操作都返回的数据
export type AlwayReturnThisField<T, DefaultValue = any> = T

// 预留字段：
export type PreserveField<DefaultValue> = any
/** 可变 id，可以随着 crud 发生改变。*/
export type MutableId = number | string
// export const MutableIdExample: MutableId = "id may change"

export enum Status {
  REMOVED = 0,

  INITIAL = 1,
  CREATE = 1,
  // UPDATE = 2,

  // ACTIVATED = 5,
  // INACTIVATED = 10,
  // PENDING = 15,

  USER_AUTH_CREATE = 1,
  USER_AUTH_PENDING = 5,
  USER_AUTH_REMOVE = 0,
  USER_AUTH_SUCCESS = 10,
  USER_AUTH_FAILURE = -1,

  WF_INACTIVE = 1,
  WF_ACTIVE = 5,
  WF_PUBLISHED = 20,

  WF_FLOW_BLOCK_REMOVE = 0,
  WF_FLOW_BLOCK_CREATE = 1,

  EXECUTION_CREATE = 1,

  WF_RUN_PROCESSING = 100,
  WF_RUN_SUCCESS = 200,
  WF_RUN_ERROR = 500,
  WF_RUN_INTERNATIONAL_ERROR = 511,
  WF_RUN_OTHER_ERROR = 512
}

/** 不可变的 id。不会随着 crud 而发生改变。*/
export type ImmutableId = number | string
// export const ImmutableIdExample: ImmutableId = "id never change"

/** 用于展示给用户的数据，可以在后台修改，但用户不能修改 */
export type Display = {
  [key in string]: any
}

export interface ItemWithDisplay {
  display: Display
}

// 具体类型见：https://www.showdoc.com.cn/1277939273701450/8983020237920893
export type ConfigType = "string" | "boolean" | /* other type */ string

export interface APIReturn {
  code?: number
  message?: string
  data: any
}

/**
 * 配置项。
 * 配置完成后称之为 inputs
 */
export interface ConfigItem extends ItemWithDisplay {
  // 用于填充表单数据
  name: string
  display: { name: string; description?: string }
  type: ConfigType
  required: boolean
  isList?: boolean
  children?: any

  defVal?: any
  testVal?: any
  show?: Record<string, string[]>
  notShow?: Record<string, string[]>

  options?: {
    name: string
    value: string
    display: { name: string; description?: string }
  }[]

  format?: string
  max?: number
  min?: number
  scale?: number
}

// export const DisplayExample: Display = {
//   "name": "name",
//   "icon": "xxx",
//   "coverUrl": "xxx"
// }

// export const ItemWithDisplayExample: ItemWithDisplay = {
//   "display": DisplayExample
// }
// export const ConfigTypeExample = "string"

// export const ConfigItemExample1: ConfigItem = {
//   "name": "domain",
//   "display": {
//     "name": "Shopify Domain",
//     "description": "Your Shopify domain. e.g.: xx.myshopify.com"
//   },
//   "type": "string",
//   "required": true
// }

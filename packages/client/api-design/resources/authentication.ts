import {
  PlatformOrIntegrationItem,
  // PlatformOrIntegrationItemExample1,
  PlatformOrIntegrationItemType
} from "./platformOrIntegration"
import {
  APIReturn,
  ConfigItem,
  // ConfigItemExample1,
  ImmutableId,
  ItemWithDisplay,
  Status
} from "./_common"

/**
 * example 数据部分取自：https://www.showdoc.com.cn/1277939273701450/9198544371552783
 */
export interface AuthenticationItem extends ItemWithDisplay {
  id: ImmutableId
  name: string

  type: PlatformOrIntegrationItemType

  // OneOf: 属于平台认证返回 platform，属于 Integration 认证则返回 integration
  // platformId?: PlatformOrIntegrationItem["id"]
  // integrationId?: PlatformOrIntegrationItem["id"]
  platformOrIntegrationId: PlatformOrIntegrationItem["id"]

  display: {
    name: string
    description?: string
    docsUrl?: string
  }

  config: ConfigItem[]
  otherConfig?: Record<string, any>
}

export interface UserAuthenticationItem {
  id: ImmutableId
  name?: string

  authenticationId: AuthenticationItem["id"]
  // 包含用户填写的数据
  inputs: any
  status: Status
  // 用户认证的信息。例如：{ domain: '', shopName: ''}
  authData: any
}

// ========================== API ======================
// Req /to-get-authentication
export interface GetAuthenticationQuery {}
export const GetAuthenticationQueryExample1 = {}

// Res
export interface GetAuthenticationReturn extends APIReturn {
  data: AuthenticationItem[]
}

// ========================== API ======================
// Req /path-to-get-user-authentication
export interface GetUserAuthenticationQuery {}
// export const GetUserAuthenticationQueryExample = {}

export interface GetUserAuthenticationReturn {
  data: UserAuthenticationItem[]
}

// POST /path-to-upsert-user-authentication
export interface UpsertUserAuthenticationBody {
  id?: UserAuthenticationItem["id"]
  status?: Status
  authenticationId: AuthenticationItem["id"]
  inputs: any
}

export interface UpsertUserAuthenticationReturn extends APIReturn {
  data: UserAuthenticationItem
}

// export const AuthenticationItemExample1: AuthenticationItem = {
//   "id": 'shopifyAuth"',
//   "name": "shopify auth",
//   "display": {
//     "name": "Shopify Authentication"
//   },
//   "type": "platform",
//   "platformOrIntegrationId": PlatformOrIntegrationItemExample1["id"],
//   "config": [ConfigItemExample1]
// }

// export const UserAuthenticationItemExample1: UserAuthenticationItem = {
//   "id": "User shopifyAuth",
//   "authenticationId": "shopifyAuth",
//   "status": Status.PENDING,
//   // 表单数据是根据 AuthenticationItem["config"] 生成的。
//   "inputs": {
//     "domain": "xxx"
//   },
//   "authData": {}
// }

// export const GetAuthenticationReturnExample1: GetAuthenticationReturn = {
//   data: [AuthenticationItemExample1]
// }
// export const GetUserAuthenticationReturnExample = {
//   "data": [
//     {
//       "id": "User shopifyAuth",
//       "authenticationId": "shopifyAuth",
//       // 表单数据是根据 AuthenticationItem["config"] 生成的。
//       "inputs": {
//         "domain": "xxx"
//       }
//     }
//   ]
// }
// export const UpsertUserAuthenticationBodyExample: UpsertUserAuthenticationBody = {
//   "status": Status.CREATE,
//   "authenticationId": "shopifyAuth",
//   "inputs": {
//     "domain": "xxx.myshopify.com"
//   }
// }

// export const UpsertUserAuthenticationReturnExample1: UpsertUserAuthenticationReturn = {
//   "data": {
//     "id": "shopify auth 1",
//     "inputs": {
//       "domain": "xxx.myshopify.com"
//     },
//     "status": Status.USER_AUTH_PENDING,
//     "authenticationId": "shopifyAuth",
//     "authData": {
//       "handle": "xxx.myshopify.com"
//       // other data...
//     }
//   }
// }

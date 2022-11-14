import { APIReturn, ImmutableId, ItemWithDisplay } from "./_common"

export type PlatformOrIntegrationItemType = "platform" | "integration"

export interface PlatformOrIntegrationItem extends ItemWithDisplay {
  id: ImmutableId
  type: PlatformOrIntegrationItemType
  name: string
  display: {
    name: string
    icon: string
  }
  // authentication: {}
}

// ========================== API ======================
// Req /to-get-platforms
export interface GetPlatformsOrIntegrationsQuery {}
// export const GetPlatformsQueryExample1 = {}

// Res
export interface GetPlatformsOrIntegrationReturn extends APIReturn {
  data: {
    platforms: PlatformOrIntegrationItem[]
    integrations: PlatformOrIntegrationItem[]
  }
}

// export const PlatformOrIntegrationItemExample1: PlatformOrIntegrationItem = {
//   "id": "1",
//   "name": "Shopify",
//   "type": "platform",
//   "display": { "name": "Shopify", "icon": "xxx" }
// }

// export const PlatformOrIntegrationItemExample2: PlatformOrIntegrationItem = {
//   "id": "2",
//   "name": "Google Sheet",
//   "type": "integration",
//   "display": { "name": "Google Sheets", "icon": "xxx" }
// }
// export const GetPlatformsReturnExample1: GetPlatformsOrIntegrationReturn = {
//   "data": {
//     "platforms": [PlatformOrIntegrationItemExample1],
//     "integrations": [PlatformOrIntegrationItemExample2]
//   }
// }

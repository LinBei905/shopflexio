import {
  APIReturn,
  ConfigItem,
  ImmutableId,
  ItemWithDisplay,
  MutableId,
  Status
} from "../resources/_common"
import {
  AuthenticationItem,
  // AuthenticationItemExample1,
  UserAuthenticationItem
  // UserAuthenticationItemExample1
} from "../resources/authentication"
import {
  PlatformOrIntegrationItem
  // PlatformOrIntegrationItemExample1
} from "../resources/platformOrIntegration"
// import { WorkflowDetail } from "./workflows.v2"

export type OperationOutputs = {
  data: any
  type: "httpTrigger" | /* etc... */ string
  display: {
    name: string
    description?: string
  }
}

export interface OperationItem extends ItemWithDisplay {
  id: ImmutableId
  name: string

  // type: PlatformOrIntegrationItemType;
  // integrationId?: PlatformOrIntegrationItem["id"];
  // platformId?: PlatformOrIntegrationItem["id"];
  platformOrIntegrationId: PlatformOrIntegrationItem["id"]

  display: {
    name: string
    description?: string
  }

  config: ConfigItem[]

  /***************************************
   * New feature: 2022-08-15
   * 如果当前 operation 可以执行，则返回相应的数据。
   * Ex:
   *  "data": {
   *    "url": "http...",
   *    "display": {
   *      "name": "Http Trigger",
   *      "description": "Trigger this workflow by visiting the following link."
   *  }
   * 前端会根据  operationOutputs 进行渲染.
   ***************************************/
  // the operation are executable.
  testable?: boolean
  // operationOutputs?: NewField<AlwayReturnThisField<OperationOutputs, null>>
}

export type BlockType = "trigger" | "action" /** 可以再划分 */
export type LogicType = "IF" | string
// export const BlockTypeExample1: BlockType = "trigger"

export interface ConnectionItem {
  preId?: any
  nextId?: any
  index?: number
  type?: any
}

export type WorkflowConnection = {
  [key: string]: {
    main?: { flowBlockId: string | number; type: string; index: number }[]
  }
}
export type Connection = ConnectionItem

// 未实例化的 block
export interface Block {
  id: ImmutableId

  name: string
  display: {
    name: string
    // icon 不存在的时候，会取 platform / integration 的 icon 作为 icon
    icon?: string
    description?: string
  }

  blockType: BlockType

  /***************************************
   * New feature: 2022-08-12
   * done: 2022年8月14日
   ***************************************/
  logicType?: "IF" | /** etc... */ string

  // OneOf：

  // type: PlatformOrIntegrationItemType
  // type == platform
  // platformId?: PlatformOrIntegrationItem["id"]
  // type == integration
  // integrationId?: PlatformOrIntegrationItem["id"]
  platformOrIntegrationId: PlatformOrIntegrationItem["id"]
  status: Status

  // 第一步：认证。
  authenticationIds: AuthenticationItem["id"][]
  // 第二步：选择 operation
  operations: OperationItem[]

  // 第三步：根据选择的 operation 中的 config 完成配置。
  //        根据 operation 中的 config 生成的表单数据。
  // inputs: any;
  //  第四步 outputs
  // testOutputData: any;

  // 当前 flowBlock 是否可以运行
  testable: boolean
  // 运行后的数据
  // liveTestOutputData: any;

  // 一个 flowBlock 可能有多个 connection
  // connections: ConnectionItem[];

  createdTime: string
  updatedTime: string
}

export interface Issue {
  type: string
  message: string
}
// 已经实例化的 block
export interface FlowBlock {
  __block__?: Block
  id: ImmutableId
  // 指向未实例化的 block 的id。
  blockId: Block["id"]
  executionId?: MutableId

  //!! new field: 2022年8月8日
  blockType: BlockType
  logicType?: LogicType

  // operationType?: string

  // 用户可以自定义。
  name: string
  status: Status

  // 变量前缀，同时也是前端用于 flowBlock 的标识
  blockCode: MutableId

  // 第一步：认证。存放所有已经认证的数据。
  //        key = AuthenticationItem["id"], value = UserAuthentication["id"]
  authenticationId: UserAuthenticationItem["id"]
  authenticationIds?: UserAuthenticationItem["id"][]

  // 第二步：选择 operation
  operationId: any

  // 第三步：根据选择的 operation 中的 config 完成配置。
  //        根据 operation 中的 config 生成的表单数据。
  inputs: any

  //  第四步 outputs。如果当前节点可以运行，返回运行的数据。
  testOutputData: any

  /***************************************
   * New feature: 2022-08-15
   * Example: liveOutputData: {"url": "xxx"}
   *
   ***************************************/
  liveOutputData?: any
  // liveOutputDisplayConfig?: {}

  executionDisplays?: any

  issues?: Issue[]

  connections: Connection
  createdTime?: string
  updatedTime?: string
}

// ========================== API ======================
// GET /path-to-get-blocks
// 部分参考自：https://www.showdoc.com.cn/1277939273701450/9181952279863391
export interface GetBlocksQuery {
  // workflowId: MutableId;
}
export const GetBlocksQueryExample1: GetBlocksQuery = {
  // "workflowId": "user-workflow-id"
}

export interface GetBlocksReturn extends APIReturn {
  data: {
    triggers: Block[]
    actions: Block[]
  }
}

// export const operationOutputsExample = {
//   "data": {
//     "url": "http...",
//     "display": {
//       "name": "Http Trigger",
//       "description": "Trigger this workflow by visiting the following link."
//     }
//   }
// }

// export const operationExample1: OperationItem = {
//   "id": "1",
//   "name": "Install / uninstall",
//   // "type": "platform",
//   "platformOrIntegrationId": PlatformOrIntegrationItemExample1["id"],
//   // "category": "store action",
//   "display": {
//     "name": "Install / uninstall your application",
//     "description":
//       "Send a corresponding incident notification to the developers of the application when installing / uninstall applications in the store"
//   },
//   "config": []
// }

// export const BlockExample1: Block = {
//   "id": "1",
//   "name": "Shopify Event",
//   "display": {
//     "name": "Shopify Event",
//     "description": "Shopify Event"
//   },
//   "blockType": "trigger",

//   // "type": "platform",
//   // "platformId": PlatformOrIntegrationItemExample1["id"],
//   "platformOrIntegrationId": PlatformOrIntegrationItemExample1["id"],

//   "status": Status.INITIAL,
//   "authenticationIds": [AuthenticationItemExample1["id"]],
//   "operations": [operationExample1],

//   // 未实例化，默认为空对象。
//   "testable": false,
//   "createdTime": Date.now().toString(),
//   "updatedTime": Date.now().toString()
// }

// export const FlowBlockExample1: FlowBlock = {
//   "id": "flowBlock id",
//   "blockId": "1",
//   "blockType": "trigger",
//   "blockCode": "block code is mutable",
//   "name": "Shopify Event#1",
//   "status": Status.WF_ACTIVE,
//   "issues": [],
//   "authenticationId": UserAuthenticationItemExample1["id"],

//   "operationId": operationExample1["id"],

//   "inputs": {
//     "domain": "xxx.shopify.com"
//   },
//   "testOutputData": {},
//   "liveOutputData": null,
//   "connections": { preId: 0, nextId: 0 },
//   "createdTime": Date.now().toString(),
//   "updatedTime": Date.now().toString()
// }
// export const GetBlocksReturnExample1: GetBlocksReturn = {
//   "data": {
//     "triggers": [
//       {
//         "id": "trigger-block-1",
//         "name": "Shopify Event",
//         "display": {
//           "name": "Shopify Name"
//         },

//         "blockType": "trigger",
//         // "type": "platform",
//         // "platformId": PlatformOrIntegrationItemExample1["id"],
//         "platformOrIntegrationId": PlatformOrIntegrationItemExample1["id"],
//         "status": Status.INITIAL,
//         "authenticationIds": [
//           AuthenticationItemExample1["id"]
//         ] /** 'shopifyAuth */,
//         "operations": [
//           {
//             "id": 386,
//             "name": "app/uninstalled",
//             "display": {
//               "name": "Uninstalled",
//               "description": "Trigger when your application uninstalled"
//             },
//             // "type": "platform",
//             // "platformId": PlatformOrIntegrationItemExample1["id"],
//             // https://api.shopflex.io/flow/blocks?pageNum=1&pageSize=10000&blockType=action&platform=sho&funCode=&channel=sap
//             // 在此 api 下 item 的 input
//             "platformOrIntegrationId": PlatformOrIntegrationItemExample1["id"],
//             "config": []
//           }
//         ],
//         "testable": false,
//         "createdTime": new Date().toString(),
//         "updatedTime": new Date().toString()
//       }
//     ],
//     "actions": []
//   }
// }

// ========================== API ======================
// 创建、更新 flowBlock
// POST /path-to-upsert-flow-block
export type UpsertFlowBlockBody = Partial<FlowBlock> & { workflowId: any }
export const UpsertFlowBlockBodyExample1: UpsertFlowBlockBody = {
  "workflowId": "current_workflow_id",
  "id": "更新 FlowBlock 需要传当前 FlowBlock Id",
  "blockId": "trigger-block-1",
  "blockCode": "ShopifyEvent#1",
  "name": "Shopify Event#1",
  "operationId": "123",
  "status": Status.CREATE /** Status.UPDATE, when perform updating. */,
  "connections": { preId: 0, nextId: 0 },
  "inputs": {
    "field1": "ok"
  }
}

export interface UpsertFlowBlockReturn extends APIReturn {}

// export const UpsertFlowBlockReturnExample1: UpsertFlowBlockReturn = {}

// ========================== API ======================
// GET /path-to-get-flow-blocks
// 获取当前工作流已实例化的 flowBlock
export interface GetFlowBlocksQuery {
  workflowId: MutableId
}

// export const GetFlowBlocksQueryExample: GetFlowBlocksQuery = {
//   "workflowId": "current_workflow_id"
// }

export interface GetFlowBlocksReturn extends APIReturn {
  data: FlowBlock[]
}

// export const GetFlowBlocksReturnExample1: GetFlowBlocksReturn = {
//   "data": [
//     {
//       "id": "",
//       "blockType": "trigger",
//       "blockId": "trigger-block-1",
//       "blockCode": "ShopifyEvent#1",
//       "name": "Shopify Event#1",
//       "operationId": "123",
//       "status": Status.CREATE,
//       "connections": { "preId": 0, "nextId": 0 },

//       "issues": [],

//       "inputs": {
//         "field1": "ok"
//       },

//       "authenticationId": "",
//       "testOutputData": {
//         "order_id": "123"
//       },
//       "liveTestOutputData": null,

//       "createdTime": String(new Date()),
//       "updatedTime": String(new Date())
//     }
//   ]
// }

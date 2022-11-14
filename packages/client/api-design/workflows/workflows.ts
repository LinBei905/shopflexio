import { AuthenticationItem } from "../resources/authentication"
import { PlatformOrIntegrationItem } from "../resources/platformOrIntegration"
import {
  APIReturn,
  ImmutableId,
  PreserveField,
  Status
} from "../resources/_common"
import { Block, FlowBlock, Issue } from "./blocks"

export type ConnectionItem = {
  flowBlockId: FlowBlock["id"]
  type: PreserveField<"main">
  index: PreserveField<0>
}

export type ConnectionsMap = {
  [key: string]: {
    main: {
      /** the next flow block id */
      flowBlockId: any
      type: PreserveField<"main">
      index: PreserveField<0>
    }[]
  }
}

export interface WorkflowItem {
  id: ImmutableId
  name: string
  // 预留：后续 ui 层面需要使用。
  coverUrl?: string
  draft: boolean
  status: Status
  draftId?: number
  activeVersion: number

  /***************************************
   * New feature: 2022-08-16
   * isPublished: 标识当前工作流是否发布。默认 false。
   *        复用工作流的时候，后台需要把该标识置为false。
   * tags: 用于展示。用户可以修改当前工作流的 tags。
   *       考虑到后续需要按照 tags 进行分类，tags
   *       提升到最外层（即，workflow.tags）。
   * display: 展示用。json 对象，支持 crud **全量**更新。
   ***************************************/
  published?: boolean
  flowCode: string
  tagList?: any[]
  display: {
    description?: string
    coverUrl?: string
    // tags?: string[]
  }

  /***************************************
   * New feature: 2022-08-16
   * 相当于 flowBlockList 的简化版。
   ***************************************/
  usedFlowBlocks: {
    blockId: Block["id"]
    blockType: Block["blockType"]
    authenticationId: AuthenticationItem["id"]
  }[]

  // type: PlatformOrIntegrationItemType
  // platformId: PlatformOrIntegrationItem["id"]
  platformOrIntegrationId: PlatformOrIntegrationItem["id"]
  // integrationId?: PlatformOrIntegrationItem["id"];

  // 用途：模板复制之前需要确保所有的认证已完成。
  /**
   * @deprecated 通过 usedFlowBlocks 中的 authenticationId 获取
   */
  authentications: AuthenticationItem["id"][]

  createdTime: string
  updatedTime: string
  statisticsData: any

  // 前端存放画布配置
  canvasConfig: { name?: any; description?: any }

  // 预留
  /**
   * @deprecated 存放到 canvasConfig 中
   */
  issues: any
  workflowConnections: ConnectionsMap
  flowBlockList: FlowBlock[]
}

// ========================== API ======================
// GET /path-to-get-workflow-list
// 参考自： https://www.showdoc.com.cn/1277939273701450/8988574559617330
export interface GetWorkflowsQuery {
  pageNum?: any
  pageSize?: any
}

export interface GetWorkflowsReturn extends APIReturn {
  data: {
    list: WorkflowItem[]
    pageSize: number
    pageNum: number
    total: number
  }
}

// ========================== API ======================
// GET /path-to-get-workflow
// 获取单个 workflow
export interface GetWorkflowQuery {
  id: ImmutableId
}

// export const GetWorkflowQueryExample1 = {
//   "id": "user-workflow-id"
// }

export interface GetWorkflowReturn extends APIReturn {
  data: WorkflowItem
}

// export const GetWorkflowReturnExample1: GetWorkflowReturn = {
//   data: WorkflowItemExample1
// }

// ========================== API ======================
// POST /path-to-upsert-workflow
// 创建 / 更新工作流。
export interface UpsertWorkflowBody extends Partial<WorkflowItem> {}
// export const UpsertWorkflowBodyExample1: UpsertWorkflowBody = {
//   "id": "",
//   "name": "Untitled Workflow",
//   // "coverUrl": "",
//   "status": Status.CREATE,
//   "canvasConfig": {} as any,
//   "issues": []
// }

export interface UpsertWorkflowReturn extends APIReturn {
  data: WorkflowItem
}

// export const UpsertWorkflowReturnExample1: UpsertWorkflowReturn = {
//   "data": WorkflowItemExample1
// }

// Req /path-to-get-published-workflow
export interface GetPublishedWorkflowsQuery {
  pageNum?: number
  pageSize?: number
}

// export const GetPublishedWorkflowsQueryExample1: GetPublishedWorkflowsQuery = {}

export interface GetPublishedWorkflowsReturn extends APIReturn {
  data: {
    /**
     * id: 复用工作流时的参数，
     */
    list: WorkflowItem[]
    pageNum: number
    pageSize: number
    total: number
  }
}

// ================================
// API
// GET /path-to-get-workflow-detail
export interface GetWorkflowDetailQuery {
  id: any
}

// export const GetWorkflowDetailQueryExample: GetWorkflowDetailQuery = {
//   "id": "current_workflow_id"
// }

export interface GetWorkflowDetailReturn extends APIReturn {
  data: WorkflowItem
}
export interface UpsertWorkflowDetailBody extends Partial<WorkflowItem> {}
export interface UpsertWorkflowDetailReturn extends APIReturn {
  data: WorkflowItem
}

// POST /path-to-upsert-flow-block
// 对于 **FlowBlock** 的增删改。
// 只有用户点击 finish 才会去调用该接口。rename 等不会去调用。
export interface UpsertFlowBlockBody extends Partial<FlowBlock> {
  workflowId: WorkflowItem["id"]
  // **FlowBlock 不需要返回 connections 。
  // id?: FlowBlock["id"]
}

export interface UpsertFlowBlockReturn extends APIReturn {
  data: WorkflowItem
}

// export const WorkflowItemExample1: WorkflowItem = {
//   "id": "user-workflow-id",
//   "name": "Untitled Workflow",
//   // "coverUrl": "",
//   "status": Status.EXECUTION_CREATE,
//   "statisticsData": null,
//   "display": {
//     "description": "This workflow is used to do ..."
//   },
//   "usedFlowBlocks": [],
//   // "type": "platform",
//   "platformOrIntegrationId": "",
//   "authentications": ["shopifyAuth"],
//   "createdTime": String(new Date()),
//   "updatedTime": String(new Date()),
//   "canvasConfig": {
//     "flowConfig": null,
//     "__vt": "1",
//     "issues": {},
//     "variables": []
//   },
//   "issues": [],
//   "workflowConnections": {},
//   "flowBlockList": []
// }
// export const GetWorkflowsQueryExample1: GetWorkflowsQuery = {
//   "pageNum": 1,
//   "pageSize": 10
// }

// export const GetWorkflowsReturnExample1: GetWorkflowsReturn = {
//   "data": {
//     "list": [
//       {
//         "id": "user-workflow-id",
//         "name": "Untitled Workflow",
//         // "coverUrl": "",
//         "status": Status.WF_ACTIVE,
//         "statisticsData": null,
//         "display": {
//           "description": "This workflow is used to do ..."
//         },
//         "usedFlowBlocks": [],
//         // "type": "platform",
//         "platformOrIntegrationId": "",
//         "authentications": ["shopifyAuth"],
//         "createdTime": String(new Date()),
//         "updatedTime": String(new Date()),
//         "canvasConfig": {} as any,
//         "issues": []
//       } as any
//     ],
//     "pageNum": 1,
//     "pageSize": 10,
//     "total": 10
//   }
// }

// export const GetPublishedWorkflowsReturnExample1: GetPublishedWorkflowsReturn =
//   {
//     "data": {
//       "list": [
//         {
//           "name": "workflow name",
//           "status": Status.WF_INACTIVE,
//           "display": {
//             "description": "This workflow is used ...."
//             // "coverUrl": ""
//           },
//           "isPublished": true,
//           "tags": ["tag1"],
//           "id": "12",
//           // "templateId": "该 id 用于调用复制工作流时的参数",
//           "usedFlowBlocks": [],
//           "authentications": [],
//           "createdTime": "now",
//           "updatedTime": "now",
//           "platformOrIntegrationId": "id",
//           "canvasConfig": {} as any,
//           "statisticsData": null,
//           "issues": null
//         } as any
//       ],
//       "pageNum": 1,
//       "pageSize": 1,
//       "total": 1
//     }
//   }

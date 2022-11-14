import { MutableId, Status } from "../resources/_common"
import { FlowBlock, OperationItem } from "./blocks"
import { WorkflowItem } from "./workflows"

export interface ExecutionBody {
  id?: MutableId
  operationId: OperationItem["id"]
  workflowId: WorkflowItem["id"]
  flowBlockId?: FlowBlock["id"]

  status?: Status

  // executionContext?: OperationItem["executionContext"]
  inputs?: FlowBlock["inputs"]
}

// export const UpsertExecutionBodyCreateExample1: UpsertExecutionBody = {
//   "status": Status.EXECUTION_CREATE,
//   "operationId": "http-operation-id",
//   "workflowId": "workflow-id",
//   // "flowBlockId": 当前 flowBlock 未创建
//   "executionContext": "执行上下文，由后端决定，前端只是原路返回。"
//   // "inputs": "在步骤2 中执行，没有 inputs"
// }

// export const UpsertExecutionBodyUpdateExample1: UpsertExecutionBody = {
//   "id": "之前返回的 execution-id",
//   "operationId": "http-operation-id",
//   "workflowId": "workflow-id",
//   // "flowBlockId": 当前 flowBlock 未创建
//   "executionContext": "执行上下文，由后端决定，前端只是原路返回。"
//   // "inputs": "在步骤2 中执行，没有 inputs"
// }

// export type ExecutionData = any

// export interface DisplayItem {
//   name: string
//   description?: string
//   icon?: string
//   type: "url" | "img" | "string" /** 等等... */
//   value: any
// }

// export type INNER_HTML_STRING = string

// export interface UpsertExecutionReturn extends APIReturn {
//   data: {
//     // inputs: any
//     executionDisplays: INNER_HTML_STRING | DisplayItem[] | DisplayItem
//   }
// }

// export const UpsertExecutionReturnCreateExample1: UpsertExecutionReturn = {
//   "data": {
//     // "inputs": "创建 execution 返回的 id",
//     "executionDisplays": {
//       "type": "url",
//       "name": "URL",
//       "description": "<div>您可以调用该链接来触发此工作流...</div>",
//       "value": "https://api.xxx.xxx"
//     }
//   }
// }

import { APIReturn, Status } from "../resources/_common"
import { FlowBlock } from "./blocks"
import { WorkflowItem } from "./workflows"

type Id = number | string
type ExecutionData = any

export interface FlowBlockItem {
  // id: Id
  flowBlockId: FlowBlock["id"]
  blockId: FlowBlock["id"]
  blockType: FlowBlock["blockType"]
  logicType?: FlowBlock["logicType"]
  name: FlowBlock["name"]
  blockCode: FlowBlock["blockCode"]
  authenticationId: FlowBlock["authenticationId"]
  operationId: FlowBlock["operationId"]

  inputs: FlowBlock["inputs"]
  outputs: ExecutionData
  startTime: string
  endTime: string
  duration: number
  // WF_RUN_PROCESSING = 100,
  // WF_RUN_SUCCESS = 200,
  // WF_RUN_ERROR = 500,
  // WF_RUN_INTERNATIONAL_ERROR = 511,
  // WF_RUN_OTHER_ERROR = 512
  status: Status
  message?: string
}

/**
 * @see https://www.showdoc.com.cn/1277939273701450/8901590850808745
 */
export interface LogItem {
  id: Id
  workflowId: WorkflowItem["id"]

  // WF_RUN_PROCESSING = 100,
  // WF_RUN_SUCCESS = 200,
  // WF_RUN_ERROR = 500,
  // WF_RUN_INTERNATIONAL_ERROR = 511,
  // WF_RUN_OTHER_ERROR = 512
  status: Status
  message?: string
  startTime: string
  endTime: string
  duration: number | string
}

// ========================== API ======================
// GET /path-to-retrieve-a-workflow-log
export interface GetWorkflowLogsQuery {
  workflowId: Id
  pageSize?: number
  pageNum?: number
  flowCode: Id

  // sortField?: string
  // 是否升序，默认false
  isAsc?: boolean
}

export interface GetWorkflowLogsReturn extends APIReturn {
  data: {
    pageSize: number
    pageNum: number
    total: number
    list: LogItem[]
  }
}

// GET /path-to-retrieve-a-specific-log-item
export interface GetLogItemQuery {
  id: LogItem["id"]
  workflowId: Id
  flowCode: Id
}

export interface GetLogItemReturn extends APIReturn {
  data: {
    record: LogItem
    flowBlockList: FlowBlockItem[]
  }
}

// export const GetLogItemQueryExample1: GetLogItemQuery = {
//   "id": "log-item-1",
//   "workflowId": "workflow-id"
// }

// {
//   "id": 208,
//   "adminId": 428,
//   "flowId": "473",
//   "curBlockId": "1228",
//   "customerId": null,
//   "flow": {
//     "id": "473",
//     "flowName": "Untitled workflow #2022-07-14",
//     "funCode": "httpTrigger"
//   },
//   "curBlock": {
//     "flowId": "473",
//     "id": "1228",
//     "name": "Http Trigger #1",
//     "type": "httpTrigger",
//     "data": null
//   },
//   "customer": null,
//   "createdTime": "2022-07-14T11:07:54.000+00:00",
//   "status": 200,
//   "msg": ""
// }
// export const GetWorkflowLogsQueryExample1: GetWorkflowLogsQuery = {
//   "workflowId": "workflow-id",
//   "pageNum": 1,
//   "pageSize": 10
// }

// export const GetWorkflowLogsReturnExample1: GetWorkflowLogsReturn = {
//   "data": {
//     "list": [
//       {
//         "id": "log-item-1",
//         "startTime": new Date().toString(),
//         "endTime": new Date().toString(),
//         "status": Status.WF_RUN_PROCESSING,
//         "duration": 1000,
//         "workflowId": "workflow-id"
//       }
//     ],
//     "pageSize": 10,
//     "pageNum": 1,
//     "total": 20
//   }
// }

// export const GetLogItemReturnExample1: GetLogItemReturn = {
//   "data": {
//     "record": GetWorkflowLogsReturnExample1["data"]["list"][0],
//     "flowBlockList": [
//       {
//         "blockId": "xxx",
//         "flowBlockId": "flow-block-id",
//         "authenticationId": "xx",
//         "name": "Shopify Trigger",
//         "inputs": {},
//         "blockCode": "xxx",
//         "blockType": "trigger",
//         "operationId": "xx",
//         // "logicType": null
//         "status": Status.WF_RUN_SUCCESS,
//         "startTime": new Date().toString(),
//         "endTime": new Date().toString(),
//         "duration": 123,
//         "outputs": {
//           // output data
//         }
//       }
//     ]
//   }
// }

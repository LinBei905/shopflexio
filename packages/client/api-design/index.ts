// @ts-nocheck
// fix friendly-errors

import type { WorkflowItem } from "./workflows/workflows"

export { Status } from "./resources/_common"

/**
 * @see ./README.md
 */

export type {
  // 获取单个工作流
  GetWorkflowQuery,
  GetWorkflowReturn,
  // 获取工作流列表
  GetWorkflowsQuery,
  GetWorkflowsReturn,
  GetPublishedWorkflowsQuery,
  GetPublishedWorkflowsReturn,
  // 创建 / 更新工作流
  UpsertWorkflowBody,
  UpsertWorkflowReturn,
  // =======================================
  // types
  WorkflowItem,
  GetWorkflowDetailQuery,
  GetWorkflowDetailReturn,
  UpsertWorkflowDetailBody,
  UpsertWorkflowDetailReturn
} from "./workflows/workflows"

export type WorkflowDetail = WorkflowItem

// export {
//   GetWorkflowDetailQuery,
//   GetWorkflowDetailReturn,
//   UpsertWorkflowDetailBody,
//   UpsertWorkflowDetailReturn,
//   PreviewDetail,
//   PreviewItem,
//   PreviewMap,
//   WorkflowDetail
// } from "./workflows/workflows.v2"

export type {
  // 获取 平台 / Integration 信息。不需要分页
  GetPlatformsOrIntegrationsQuery,
  GetPlatformsOrIntegrationReturn,
  // ========================================
  // types
  PlatformOrIntegrationItem,
  PlatformOrIntegrationItemType
} from "./resources/platformOrIntegration"

export type {
  // 获取授权信息。
  GetAuthenticationQuery,
  GetAuthenticationReturn,
  GetUserAuthenticationQuery,
  GetUserAuthenticationReturn,
  // ==============================
  // types
  AuthenticationItem,
  UserAuthenticationItem,
  UpsertUserAuthenticationBody,
  UpsertUserAuthenticationReturn
} from "./resources/authentication"

export type {
  // 获取当前工作流
  GetBlocksQuery,
  GetBlocksReturn,
  // 获取当前工作流 flowBlocks，不需要分页。
  GetFlowBlocksQuery,
  GetFlowBlocksReturn,
  // 创建 / 更新当前工作流 flowBlock
  UpsertFlowBlockBody,
  UpsertFlowBlockReturn,
  // =============================
  // types
  BlockType,
  Block,
  FlowBlock,
  Connection,
  WorkflowConnection,
  ConnectionItem,
  OperationItem,
  Issue
} from "./workflows/blocks"

export type {
  GetLogItemQuery,
  GetLogItemReturn,
  GetWorkflowLogsQuery,
  LogItem,
  FlowBlockItem,
  GetWorkflowLogsReturn
} from "./workflows/log"

export type {
  GetPricingQuery,
  GetPricingReturn,
  Pricing,
  Quota,
  PricingDefinition,
  PricingType
} from "./account"

export * from "./global-variable"

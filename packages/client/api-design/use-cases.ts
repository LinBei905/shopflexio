import { Status } from "./resources/_common"
import { WorkflowItem } from "./workflows/workflows"

type Id = number | string
// ========================== API ======================
// GET /path-to-upsert-use-cases-config
export interface UpsertUseCasesConfig {
  status: Status
  config: any
}

// GET /path-to-get-workflow-by-ids
export interface GetWorkflowByIds {
  ids: Id[]
}

export interface GetWorkflowByIdsReturn {
  data: {
    list: WorkflowItem[]
  }
}

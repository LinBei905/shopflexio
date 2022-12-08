import {
  GetAuthenticationQuery,
  GetAuthenticationReturn,
  GetPlatformsOrIntegrationReturn,
} from '../api-design'
import { clearVoidKey, isNumber, parse } from '../shared'
import { get } from './_request'

export async function getPublishedWorkflows(params: any = {}) {
  const { pageNum = 1, pageSize = 12, platform, tags = '', keyword = '' } = params

  return getWorkflows({
    pageNum,
    pageSize,
    platform,
    tags,
    keyword,
    // @ts-ignore
    published: true,
  })
}

export function getPublishedWorkflowTags(params: { platform?: string } = {}) {
  const { platform = 'sho' } = params
  return get('/flow/v2/tags/list', { platform })
}

function getWorkflows(params: {
  pageNum?: number
  pageSize?: number
  platform?: string
  tags?: string[]
  keyword?: string
}) {
  const { pageNum = 1, pageSize = 10, platform = 'sho', tags, keyword } = params
  const _params = clearVoidKey({ ...params, pageNum, pageSize, platform })

  if (Array.isArray(tags) && tags.length) {
    _params.tags = tags.join(',')
  }

  return get(`/flow/v2/publish/list`, _params).then((res) => {
    const { list = [], pageNum = _params.pageNum, pageSize = _params.pageSize } = res
    const _list = list || []
    return {
      ...res,
      list: _list.map((item) => _normalizeWorkflowItem(item)),
      pageNum,
      pageSize,
    }
  })
}

function _normalizeWorkflowItem(workflow: any) {
  const { createdTime, updatedTime, config, tagList = [], flowBlockList = [] } = workflow
  const _tagList = Array.isArray(tagList) ? tagList : []
  // const _flowBlockList = flowBlockList.map((item) => {})
  // console.log('flowBlockList: ', workflow.flowBlockList, flowBlockList)

  return {
    ...workflow,
    tagList: _tagList,
    flowBlockList: flowBlockList || [],
    createdAt: normalizeDate(createdTime),
    updatedAt: normalizeDate(updatedTime),
    config: parse(config),
  }
}

function normalizeDate(date: string | number) {
  if (!date) return date
  if (isNumber(date)) return date
  // '2022-06-16T09:52:45.000+00:00' or '92342' -> timestamp
  return date.includes('-') ? +new Date(date) : Number.parseInt(date)
}

export async function getBlocks(params: { platform?: string } = {}) {
  const { platform = 'sho' } = params
  return get(`/flow/v2/blocks`, { platform }).then((res) => {
    const { trigger, triggers, action, actions } = res
    return {
      triggers: triggers || trigger,
      actions: actions || action,
    }
  })
}

export async function getPlatformsOrIntegrations(): Promise<
  GetPlatformsOrIntegrationReturn['data']
> {
  return get(`/flow/v2/platformsOrIntegrations`)
}

export async function getAuthentications(
  params: GetAuthenticationQuery = {},
): Promise<GetAuthenticationReturn['data']> {
  return get(`/flow/v2/authentications`)
}

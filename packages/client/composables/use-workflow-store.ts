import { computed } from '@nuxtjs/composition-api'

import { WorkflowDetail, WorkflowItem } from '../api-design'
import { useStore } from './use-store'
import { isVoid, toObjectMap } from '../shared'

// const _useWorkflow = () => {}

export const useCommonStore = () => {
  const { state, dispatch } = useStore('workflow')

  const tagsList = computed(() => state.value.tagsList)

  const workflowList = computed(() => {
    const list = state.value.workflowList || []
    return list.map((wItem: WorkflowDetail) => {
      let { canvasConfig, name, display, flowBlockList } = wItem
      flowBlockList = flowBlockList || []
      canvasConfig = canvasConfig || {}
      display = display || {}
      const seen = new Set()

      let _flowBlockList = flowBlockList.filter((fBlock) => {
        const { blockId } = fBlock
        if (seen.has(blockId)) return false
        seen.add(blockId)
        return true
      })

      let _name = name
      let _desc = display.description

      if (canvasConfig.name && canvasConfig.name.en) {
        _name = canvasConfig.name.en
      }

      if (canvasConfig.description && canvasConfig.description.en) {
        _desc = canvasConfig.description.en
      }

      let apps = _flowBlockList.map((fBlock) => {
        const { blockId, blockType } = fBlock
        const _block = getBlock(blockId, blockType)
        const _platformOrIntegration = getPlatformOrIntegration(_block?.platformOrIntegrationId)
        let icon = _block?.display.icon

        if (isVoid(icon) && _platformOrIntegration) {
          icon = _platformOrIntegration.display?.icon
        }

        return { ...fBlock, icon, block: _block, platformOrIntegration: _platformOrIntegration }
      })

      apps = apps.length >= 6 ? apps.slice(0, 6) : apps

      return {
        ...wItem,
        name: _name,
        description: _desc,
        apps,
        tags: wItem.tagList || [],
      }
    })
  })

  const workflowListState = computed(() => state.value.workflowListState)

  const platforms = computed(() => state.value.platforms)
  const integrations = computed(() => state.value.integrations)
  const triggers = computed(() => state.value.triggers)
  const actions = computed(() => state.value.actions)
  const triggersMap = computed(() => toObjectMap(triggers.value))
  const actionsMap = computed(() => toObjectMap(actions.value))
  const platformsMap = computed(() => toObjectMap(platforms.value))
  const integrationsMap = computed(() => toObjectMap(integrations.value))

  const getPlatformOrIntegration = (id) => {
    return platformsMap.value[id] || integrationsMap.value[id]
  }
  const getBlock = (blockId, blockType?: 'action' | 'trigger') => {
    if (blockType == 'action') return actionsMap.value[blockId]
    if (blockType == 'trigger') return triggersMap.value[blockId]
    return triggersMap.value[blockId] || actionsMap.value[blockId]
  }

  const dispatchWorkflowList = (payload) => dispatch('getWorkflowList', payload)

  return {
    getBlock,
    getPlatformOrIntegration,
    tagsList,
    workflowList,
    workflowListState,
    platforms,
    integrations,
    triggers,
    actions,
    dispatchWorkflowList,
    dispatch,
  }
}

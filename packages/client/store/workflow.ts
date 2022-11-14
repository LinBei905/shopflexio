// import { toObjectMap } from '@shopflex-automation/shared'
import { ActionHandler } from 'vuex'

import {
  getBlocks,
  getPublishedWorkflows,
  getPublishedWorkflowTags,
  getPlatformsOrIntegrations,
} from '../api'

export const state = () => {
  return {
    tagsList: [],
    workflowList: [],
    workflowListState: {
      pageNum: 1,
      pageSize: 8,
      total: 0,
      tags: '',
    },
    triggers: [],
    actions: [],
    platforms: [],
    integrations: [],
  }
}

type State = ReturnType<typeof state>

export const mutations: Record<string, (state: State, payload: any) => any> = {
  setTagsList(state, payload) {
    state.tagsList = payload
  },

  setWorkflowList(state, payload) {
    state.workflowList = payload
  },
  setWorkflowListState(state, payload) {
    state.workflowListState = payload
  },

  setTriggers(state, payload) {
    state.triggers = payload
  },
  setActions(state, payload) {
    state.actions = payload
  },

  setPlatforms(state, payload) {
    state.platforms = payload
  },
  setIntegrations(state, payload) {
    state.integrations = payload
  },
}

export const actions: Record<string, ActionHandler<any, any>> = {
  async getTagsList({ commit }) {
    const tagsList = await getPublishedWorkflowTags()
    commit('setTagsList', tagsList)
  },

  async getBlocks({ commit }) {
    const { triggers, actions } = await getBlocks()
    commit('setTriggers', triggers)
    commit('setActions', actions)
  },

  async getPlatformsOrIntegrations({ commit }) {
    const { platforms, integrations } = await getPlatformsOrIntegrations()
    commit('setPlatforms', platforms)
    commit('setIntegrations', integrations)
  },

  async getWorkflowList({ commit }, payload = {}) {
    const { list, ...rest } = await getPublishedWorkflows(payload)
    commit('setWorkflowList', list)
    commit('setWorkflowListState', { ...payload, ...rest })
    // return list
  },
}

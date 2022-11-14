import { logger } from '../shared'

export const state = () => ({
  locales: ['en', 'zh'],
  locale: 'de',
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    try {
      await Promise.all([
        dispatch('workflow/getTagsList'),
        dispatch('workflow/getWorkflowList'),
        dispatch('workflow/getBlocks'),
        dispatch('workflow/getPlatformsOrIntegrations'),
      ])
    } catch (err) {
      logger.log('err: ', err.message)
    }
  },
}

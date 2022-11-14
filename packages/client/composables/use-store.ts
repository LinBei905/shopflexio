import { computed, ComputedRef, useStore as _useStore } from '@nuxtjs/composition-api'

export const useStore = <S = any>(namespace: string = '') => {
  const store = _useStore<any>()
  const state = computed(() => (namespace ? store.state[namespace] : store.state)) as ComputedRef<S>

  const _getScope = (key: string) => (namespace ? `${namespace}/${key}` : key)

  const commit = (key: string, payload?: any) => store.commit(_getScope(key), payload)
  // const getters = computed(() => (namespace ? store.getters[namespace] : store.getters))

  const dispatch = (key: string, payload?: any) => store.dispatch(_getScope(key), payload)

  return {
    state,
    // getters,
    commit,
    dispatch,
  }
}

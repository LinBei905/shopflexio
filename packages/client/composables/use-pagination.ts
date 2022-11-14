// @ts-nocheck
import { computed, onMounted, reactive, ref } from '@vue/composition-api'

import { isFunction } from '~/shared'

import { useLoading } from './use-loading'

export interface UsePaginationOptions {
  pageNum?: number
  pageSize?: number
  searchKey?: string
  fetchOnMounted?: Function
  beforeFetch?: Function
  afterFetch?: Function
  filter?: Function
  formatter?: any
}
export const usePagination = (fetcher, options: UsePaginationOptions = {}) => {
  if (!fetcher) {
    throw new Error('Invalid fetcher')
  }
  const { isLoading: isFetching, run } = useLoading()
  const currentSelections = ref([])

  const {
    pageNum = 1,
    pageSize = 10,
    total = 0,
    fetchOnMounted = true,
    beforeFetch = () => true,
    afterFetch,
    filter = () => true,
    formatter,
  } = options

  const pagination = reactive({
    pageNum,
    pageSize,
    searchKey: undefined,
    query: {},
    total,
  })

  const data = ref({})
  const list = computed(() => data.value.list || [])
  const filteredList = computed(() => {
    let _list = list.value.filter((item, index, list) => filter(item, index, list))

    _list = formatter ? _list.map(formatter) : _list

    return _list
  })

  const fetchData = async (params = {}) => {
    const { pageNum, pageSize, query } = { ...pagination, ...params }
    const isOk = await beforeFetch()
    if (!isOk) return
    const _data = await run(
      fetcher({
        pageNum,
        pageSize,
        ...query,
        ...params,
      }),
      {
        withMsg: false,
      },
    )
    data.value = _data
    pagination.pageNum = _data.pageNum
    pagination.pageSize = pageSize || pagination.pageSize
    pagination.total = _data.total
    pagination.searchKey = _data.searchKey
    if (isFunction(afterFetch)) {
      afterFetch({ pagination: { ...pagination } })
    }
  }

  const setPageNum = (pageNum, refresh = true) => {
    pagination.pageNum = pageNum
    refresh && fetchData()
  }

  const setPageSize = (pageSize, refresh = true) => {
    pagination.pageSize = pageSize
    refresh && fetchData({ pageNum: 1 })
  }

  const setSearchKey = (searchKey, refresh = true) => {
    pagination.searchKey = searchKey
    refresh && fetchData()
  }

  const updateItem = (mapper) => {
    const list = data.value.list || []
    data.value.list = list.map(mapper)
  }

  const removeItem = (filter) => {
    const list = data.value.list || []
    data.value.list = list.filter(filter)
    pagination.total = pagination.total - 1
  }

  const setQuery = (query, refresh = true) => {
    if (pagination.query === query) return

    if (!query) {
      pagination.query = {}
    } else {
      pagination.query = query
    }

    if (refresh) {
      fetchData({ pageNum: 1 })
    }
  }

  const setCurrentSelections = (selections) => (currentSelections.value = selections)

  onMounted(() => {
    if (fetchOnMounted) fetchData()
  })

  return {
    ...pagination,
    currentSelections,
    pagination,
    data,
    isFetching,
    list,
    filteredList,
    setQuery,
    setSearchKey,
    fetchData,
    setPageNum,
    setPageSize,
    updateItem,
    removeItem,
    setCurrentSelections,
  }
}

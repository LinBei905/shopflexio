<template>
  <div class="application-scenario" style="overflow: auto;">
    <div class="workflow-templates">
      <div class="vt-w-full">
        <div ref="anchorRef" class="anchor"></div>
        <div class="wrapper m-auto">
          <div class="text-center mb-4 md:text-right">
            <ElSelect
              v-if="hasTags"
              v-model="activeTag"
              clearable
              filterable
              size="medium"
              class="w-72 sm:w-auto"
              @change="handleChangeTag"
            >
              <ElOption key="all" value="" label="All"></ElOption>
              <ElOption v-for="tag in tagsList" :key="tag.name" :value="tag.name" :label="tag.name">
                {{ tag.name }}
                <span class="vt-mx-2"> ({{ tag.flowNums }}) </span>
              </ElOption>
            </ElSelect>
          </div>
          <transition-group
            tag="div"
            name="el-fade-in"
            class="vt-flex-gap-9 vt-flex vt-flex-wrap justify-center sm:justify-start"
          >
            <a
              v-for="item in workflowList"
              :key="item.id"
              :href="'https://ap.shopflex.io/published-workflow/' + item.flowCode"
              target="_blank"
            >
              <el-card
                class="workflow-item rounded-sm"
                shadow="hover"
                body-style="height: 100%"
                style="width: 296px;"
              >
                <div class="vt-h-full vt-flex-col">
                  <div class="item-name vt-text-overflow-2" style="height: 60px;">
                    {{ item.name }}
                  </div>

                  <div class="apps vt-flex-ic-gap-2">
                    <div
                      v-for="(app, index) in item.apps"
                      :key="index"
                      class="rounded-full flex justify-center items-center w-9 h-9"
                      style="border: 1px solid #eee;"
                    >
                      <img style="width: 20px; height: 20px;" :src="app.icon" />
                    </div>
                  </div>

                  <div class="vt-flex-1">
                    <div class="item-desc vt-mt-2 vt-text-overflow-4">
                      {{ item.description }}
                    </div>
                  </div>
                  <div class="item-tags vt-flex-gap-2 vt-flex-wrap">
                    <el-tag v-for="tag in item.tags" :key="tag.name">{{ tag.name }}</el-tag>
                  </div>
                </div>
              </el-card>
            </a>
          </transition-group>
        </div>

        <div class="mt-6" style="text-align: center;">
          <ElPagination
            layout="total, sizes, prev, pager, next"
            :current-page="workflowListState.pageNum"
            :page-size="workflowListState.pageSize"
            :page-sizes="[2, 12, 24, 36]"
            :total="workflowListState.total"
            :disabled="isLoading"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from '@nuxtjs/composition-api'

import { useCommonStore, useLoading } from '~/composables'
import { logger } from '~/shared'

// import VtAcTitle from '~/components/ApplicationScenario/VtAcTitle.vue'

export default defineComponent({
  name: 'WorkflowTable',
  components: {},

  setup() {
    const { tagsList, workflowList, workflowListState, dispatchWorkflowList } = useCommonStore()
    const hasTags = computed(() => tagsList.value && tagsList.value.length > 0)
    const activeTag = ref('')
    const { isLoading, run } = useLoading({ withMsg: false })
    const anchorRef = ref<HTMLDivElement>()

    const _update = async (payload: any = {}) => {
      const { scroll = true, ...rest } = payload
      try {
        await run(dispatchWorkflowList(rest))
        scroll && anchorRef.value?.scrollIntoView({ behavior: 'smooth' })
      } catch (err) {
        logger.warn('dispatchWorkflowList err: ', err)
      }
    }
    const handleChangeTag = (tags) => {
      return _update({ ...workflowListState.value, tags, pageNum: 1, scroll: false })
    }
    const handleSizeChange = (pageSize) => {
      return _update({ ...workflowListState.value, pageSize, pageNum: 1 })
    }
    const handleCurrentChange = (pageNum) => {
      return _update({ ...workflowListState.value, pageNum })
    }

    return {
      tagsList,
      hasTags,
      activeTag,
      workflowList,
      workflowListState,
      isLoading,
      anchorRef,
      handleSizeChange,
      handleCurrentChange,
      handleChangeTag,
    }
  },
})
</script>

<style lang="scss" scoped>
.workflow-item {
  position: relative;
  height: 280px;

  text-align: left;
  .item-name {
    word-break: break-word;
    font-weight: 600;
    font-size: 20px;
    line-height: 1.5;
    color: #2b2e32;
    // text-align: center;
  }

  .item-desc {
    word-break: break-word;
    font-size: 14px;
    line-height: 20px;
    color: rgba(43, 46, 50, 0.7);
    // text-align: center;
  }
}
.wrapper {
  max-width: 960px;
}

@media screen and (min-width: 1440px) {
  .wrapper {
    max-width: 1294px;
  }
}
</style>

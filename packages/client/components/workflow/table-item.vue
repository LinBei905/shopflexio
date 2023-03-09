<template>
  <ElCard shadow="hover" class="vt-wf-published-item" body-style="height: 100%">
    <div class="vt-h-full vt-flex-col">

      <div class="apps vt-flex-ic-gap-2">
        <VtTooltip v-for="(app, index) in apps" :key="index" :content="app.name">
          <VtAvatar size="sm">
            <VtIcon style="width: 20px; height: 20px;" :icon="app.icon" />
          </VtAvatar>
        </VtTooltip>
      </div>

      <div class="item-name vt-text-overflow-2" style="height: 60px;">
        {{ workflowName }}
      </div>

      <div class="vt-flex-1">
        <div class="item-desc vt-mt-2 vt-text-overflow-4">
          {{ desc }}
        </div>
      </div>
      <div class="item-tags vt-flex-gap-2 vt-flex-wrap">
        <ElTag v-for="tag in tags" :key="tag">{{ tag }}</ElTag>
      </div>
    </div>
  </ElCard>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

import { useI18n } from '~/composables'
export default defineComponent({
  name: 'VtWfPublishedItem',
  props: {
    item: { type: Object, required: true },
    name: { type: String },
    description: { type: String },
  },
  setup(props) {
    const { $p, $t3 } = useI18n()
    const apps = computed(() => props.item.apps)
    const workflowName = computed(() => {
      const { name, canvasConfig } = props.item
      let _name = { zh: name, en: name }
      if (canvasConfig != null) {
        _name = canvasConfig.name
      }

      return $t3(_name)
    })
    const desc = computed(() => {
      const { display, canvasConfig } = props.item
      let description = display?.description
      if (description) {
        description = $p(description)
      } else {
        description = ''
      }

      let _description = { zh: description, en: description }
      if (canvasConfig != null) {
        _description = canvasConfig.description
      }

      return $t3(_description)
    })
    const tags = computed(() => (props.item.tagList || []).map((item) => item.name))
    return { apps, workflowName, desc, tags }
  },
})
</script>

<style lang="scss" scoped>
.vt-wf-published-item {
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
</style>

<template>
  <div class="news mt-20" style="min-height: calc(100vh - 72px);">
    <h1 class="w-full mb-4 text-5xl font-bold leading-tight text-center text-gray-800">
      News
    </h1>
    <div class="list">
      <news />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import News from '~/components/News.vue'
export default defineComponent({
  name: 'NewsPage',
  components: { News },
  // meta: {
  //   headerActive: true,
  // },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.list {
  max-width: 1320px;
  margin: auto;
}
</style>

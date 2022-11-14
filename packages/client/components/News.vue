<template>
  <el-row :gutter="24" wrap v-bind="$attrs">
    <el-col
      :span="24"
      :md="8"
      :lg="6"
      v-for="(item, index) in list"
      :key="index"
      style="margin-bottom: 24px;"
    >
      <news-item :item="item" />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { news as list } from '~/assets/data'
import NewsItem from '~/components/NewsItem.vue'

export default defineComponent({
  name: 'News',
  components: {
    NewsItem,
  },
  setup() {
    return { list }
  },
})
</script>

<style lang="scss" scoped></style>

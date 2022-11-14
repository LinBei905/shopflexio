<template>
  <div class="news-item">
    <div
      :href="item.link"
      target="_blank"
      class="flex flex-col justify-between gap-2 w-full p-4 shadow-md rounded-lg hover:shadow-xl hover:text-black"
      style="height: 480px;"
    >
      <el-image
        class="w-full rounded-lg overflow-hidden object-cover"
        :src="item.cover"
        lazy
        :alt="item.title"
      />

      <div class="wrapper mt-4 mb-2">
        <span class="bg-primary text-sm px-4 py-1 rounded-lg text-white" v-if="item.tag">
          {{ item.tag }}
        </span>
      </div>

      <h3 class="text-lg font-bold">{{ item.title }}</h3>

      <p>
        {{ item.description }}
      </p>

      <div class="date">
        <span class="text-gray-300" v-if="item.date">{{ item.date }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'NewsItem',
  props: {
    cover: {},
    link: {},
    tag: {},
    title: {},
    description: {},
    date: {},
    item: {},
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>

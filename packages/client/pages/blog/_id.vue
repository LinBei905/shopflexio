<template>
  <div class="blog-id mt-4 max-w-6xl px-16 m-auto">
    <article v-if="currentBlog">
      <header class="mt-2 mb-16 xl:px-32">
        <h1 class="font-bold text-4xl">
          {{ currentBlog.title }}
        </h1>
        <div class="tags mt-3 flex gap-2">
          <div
            v-for="tag in currentBlog.tags"
            :key="tag"
            class="border border-solid border-black rounded-full px-5 text-lg"
            style="line-height: 1.7;"
          >
            <span>
              {{ tag }}
            </span>
          </div>
        </div>
      </header>
      <el-image class="w-full" :src="currentBlog.cover" lazy :alt="currentBlog.title"></el-image>

      <section class="mt-6 mb-8">
        <div class="ql-container ql-snow" style="border: none;">
          <div class="ql-editor" style="padding: 0;" v-html="currentBlog.content"></div>
        </div>
      </section>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useAsync, useRoute } from '@nuxtjs/composition-api'

import { getBlogData } from '~/api'
export default defineComponent({
  name: 'Id',
  setup() {
    const blogData = useAsync(() => {
      return getBlogData()
    })

    const list = computed(() => {
      let res = blogData.value?.list || []
      return res.sort((a, b) => {
        if (a.order == b.order) {
          return a.updated_time - b.updated_time
        }

        return Number(a.order) - Number(b.order)
      })
    })
    const route = useRoute()
    const id = computed(() => {
      return route.value.params.id as string
    })
    const currentBlog = computed(() => {
      return list.value.find((b) => b.id == id.value)
    })

    return {
      currentBlog,
    }
  },
})
</script>

<style lang="scss" scoped></style>

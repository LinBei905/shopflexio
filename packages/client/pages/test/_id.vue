<template>
  <div class="blog-id mt-4 max-w-6xl px-16 m-auto">
    <article v-if="currentBlog">
      <nuxt-content :document="currentBlog" />
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useAsync, useRoute } from '@nuxtjs/composition-api'

import { getBlogData } from '~/api'
export default defineComponent({
  name: 'Id',
  data() {
    return {
      currentBlog: {}
    }
  },
  async mounted() {
    this.currentBlog = await this.$content(this.$route.params.id as string).fetch()
  }
})
</script>

<style lang="scss" scoped></style>

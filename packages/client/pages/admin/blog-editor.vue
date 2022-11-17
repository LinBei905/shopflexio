<template>
  <div class="blog-editor">
    <blog-editor />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import BlogEditor from '~/components/blog-editor/BlogEditor.vue'
import { useNamespace } from '~/composables'

export default defineComponent({
  name: 'BlogEditor',
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>

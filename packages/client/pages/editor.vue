<template>
  <div class="editor">
    <no-ssr>
      <vt-editor />
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  head: {
    link: [{ href: 'https://cdn.quilljs.com/1.0.0/quill.snow.css', rel: 'stylesheet' }],
    script: [{ src: 'https://cdn.quilljs.com/1.0.0/quill.js' }],
  },
})
</script>

<style lang="scss" scoped>
.editor {
  margin-top: 50px;
  margin-bottom: 120px;
}
</style>

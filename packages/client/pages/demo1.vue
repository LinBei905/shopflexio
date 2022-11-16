<template>
  <div class="demo1">
    demo
    <no-ssr>
      <quill-editor v-model="content" />
    </no-ssr>

    <div class="ql-container ql-snow">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Demo1',
  setup() {
    const content = ref('')

    return {
      content,
    }
  },
})
</script>

<style lang="scss" scoped></style>

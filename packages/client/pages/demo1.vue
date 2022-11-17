<template>
  <div class="demo1"></div>
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

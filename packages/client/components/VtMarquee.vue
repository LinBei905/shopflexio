<template>
  <no-ssr>
    <marquee-text v-bind="$attrs">
      <slot />
    </marquee-text>
  </no-ssr>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'VtMarquee',
  components: {},
  props: {},
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>

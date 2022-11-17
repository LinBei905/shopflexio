<template>
  <div class="default-layout">
    <TheHeader />

    <main class="pt-20" style="min-height: calc(100vh - 80px);">
      <nuxt />
    </main>

    <TheFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import TheFooter from '~/components/home/footer.vue'
import TheHeader from '~/components/home/header.vue'

export default defineComponent({
  name: 'Default',
  components: {
    TheFooter,
    TheHeader,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>

<template>
  <div v-if="blogItem" class="_id">
    {{ blogItem }}
    <img :src="blogItem.cover" alt="" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, useRoute } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Id',
  setup() {
    const route = useRoute()
    const id = computed(() => route.value.params.id)
    const isPreview = computed(() => id.value == 'preview')
    const blogItem = ref<any>(null)
    onMounted(() => {
      if (isPreview.value) {
        blogItem.value = JSON.parse(window.sessionStorage.getItem('blog-preview') || '{}')
      }
    })
    return {
      blogItem,
    }
  },
})
</script>

<style lang="scss" scoped></style>

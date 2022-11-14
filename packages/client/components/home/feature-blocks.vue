<template>
  <div class="feature-blocks">
    <section class="relative">
      <!-- {/* Section background (needs .relative class on parent and next sibling elements) */} -->
      <!-- <div
        class="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"
      ></div> -->

      <div class="relative mx-auto px-4 sm:px-6">
        <div class="pm-12 md:pm-20">
          <!-- {/* Section header */} -->
          <div class="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 class="h2 mb-4">Use Cases</h2>
            <p class="text-xl text-gray-600">
              Start automating a task instantly with pre-made templates
            </p>
          </div>

          <!-- {/* Items */} -->
          <WorkflowTable />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import WorkflowTable from '../workflow/table.vue'

export default defineComponent({
  name: 'FeatureBlocks',
  components: {
    WorkflowTable,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>

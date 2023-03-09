<template>
  <div class="feature-blocks pb-6 md:pb-10">
    <section class="relative max-w-6xl mx-auto mt-12">
      <!-- {/* Section background (needs .relative class on parent and next sibling elements) */} -->
      <!-- <div
        class="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"
      ></div> -->

      <div class="relative">
        <div class="">
          <!-- {/* Section header */} -->
          <div class="mb-4 mx-2">
            <h2 id="use-cases" class="h2 sectionTitle">Use Cases</h2>
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

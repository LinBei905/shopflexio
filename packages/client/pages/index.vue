<template>
  <div class="home-page">
    <!-- <div className="flex flex-col min-h-screen overflow-hidden">
      <TheHeader />
    </div> -->

    <!-- <main className="flex-grow"> -->
    <!-- {/* Page sections */} -->
    <!-- <div
        class="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"
      ></div> -->
    <!-- <FeaturesHome /> -->
    <HeroHome />
    <FeaturesBlocks />
    <Testimonial />
    <!-- <Newsletter /> -->
    <!-- </main> -->
    <!-- <TheFooter /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import FeaturesBlocks from '../components/home/feature-blocks.vue'
// import TheFooter from '../components/home/footer.vue'
// import TheHeader from '../components/home/header.vue'
import HeroHome from '../components/home/hero-home.vue'
import Testimonial from '../components/home/testimonial.vue'

export default defineComponent({
  name: 'Index',
  components: {
    // TheHeader,
    HeroHome,
    FeaturesBlocks,
    Testimonial,
    // TheFooter,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>

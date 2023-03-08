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
    <div class="w-full bg-overview-background bg-cover">
      <Overview id="Overview" />
      <!-- <HeroHome /> -->
      <Features id="Features" />
    </div>
    <div class="w-full midBg">
      <Testimonial />
      <FeaturesBlocks id="Use Cases" />
      <CustomersBlock id="Customers" />
      <Prices id="Pricing" />
      <div class="w-full bg-bottom-background bg-cover mb-28">
        <GetStart id="GetStart" />
      </div>
    </div>
    <!-- <Newsletter /> -->
    <!-- </main> -->
    <!-- <TheFooter /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import CustomersBlock from '../components/home/customers-block.vue'
import FeaturesBlocks from '../components/home/feature-blocks.vue'
import Features from '../components/home/features.vue'
import GetStart from '../components/home/get-start.vue'
import HeroHome from '../components/home/hero-home.vue'
import Overview from '../components/home/overview.vue'
import Prices from '../components/home/prices.vue'
import Testimonial from '../components/home/testimonial.vue'

export default defineComponent({
  name: 'Index',
  components: {
    // HeroHome,
    CustomersBlock,
    FeaturesBlocks,
    Testimonial,
    Overview,
    GetStart,
    Features,
    Prices
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.midBg {
  background: linear-gradient(to bottom, #eff2fb, #ffffff),
    linear-gradient(to bottom, #ffffff, #eef1fc);
}
</style>

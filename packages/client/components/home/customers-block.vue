<template>
  <div class="testimonial bg-white">
    <section class="relative">
      <!-- {/* Illustration behind content */} -->
      <div class="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -mb-32" aria-hidden="true">
        <!-- <svg width="1760" height="518" viewBox="0 0 1760 518" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="illustration-02" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g transform="translate(0 -3)" fill="url(#illustration-02)" fillRule="evenodd">
            <circle cx="1630" cy="128" r="128" />
            <circle cx="178" cy="481" r="40" />
          </g>
        </svg> -->
      </div>

      <div class="mx-auto px-4 sm:px-6">
        <div class="py-12 md:py-20">
          <!-- {/* Section header */} -->
          <div class="max-w-6xl mx-auto pb-8">
            <h2 class="h2 mb-4 sectionTitle">Customers & Reviews</h2>
            <!-- <p class="text-xl text-gray-600" data-aos="zoom-y-out">
              ShopFlex is the trusted integration solution for unifying data between Shopify and
              your enterprise systems.
            </p> -->
          </div>

          <Customers />
          <!-- {/* Items */} -->
          <Recommendation />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import Customers from '../Customers.vue'
import Recommendation from '../Recommendation.vue'



export default defineComponent({
  name: 'Testimonial',
  components: {
    Customers,
    Recommendation
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>

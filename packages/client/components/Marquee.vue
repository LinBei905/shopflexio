<template>
  <vt-marquee :duration="duration">
    <ul class="list">
      <li class="list__item bg-gray-400" v-for="(item, index) in list" :key="index">
        <slot :item="item">
          {{ item }}
        </slot>
      </li>
    </ul>
  </vt-marquee>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCommonStore } from '~/composables'
import VtMarquee from './VtMarquee.vue'
export default defineComponent({
  components: { VtMarquee },
  name: 'Marquee',
  props: {
    list: Array,
    clickable: Boolean,
    duration: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    const { integrations } = useCommonStore()
    return {}
  },
})
</script>

<style lang="scss" scoped></style>

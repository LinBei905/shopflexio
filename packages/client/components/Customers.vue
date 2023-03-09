<template>
  <div class="mb-16 max-w-6xl m-auto bg-white">
    <div class="flex items-center container">
      <div v-for="item in 7" :key="item" class="max-w-3xl">
        <img :src="getImgUrl(item)" alt="">
      </div>
    </div>
    <div class="flex items-center container">
      <div v-for="item in 7" :key="item + 7" class="max-w-3xl">
        <img :src="getImgUrl(item + 7)" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from '@nuxtjs/composition-api'

export default {
  name: 'Integrations',
  methods: {
    getImgUrl(index) {
      const image = require.context('~/assets/img', false, /\.png$/)
      return image('./' + index + ".png")
    }
  }
}
</script>

<style lang="scss" scoped>
.marquee {
  color: black;

  &__item {
    background: #f4f4f5;
    border-radius: 999px;

    &:hover {
      color: var(--vt-c-primary);
      background: #e9f0fe;
    }
  }
}

.container {
  overflow-x: hidden;
  justify-content: space-around;
  // animation: slide 10s linear infinite;
}

@keyframes slide {
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(-150px, 0, 0);
    /* The image width */
  }
}
</style>

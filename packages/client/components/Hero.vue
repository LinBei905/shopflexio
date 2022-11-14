<template>
  <div class="hero mb-16">
    <hero-content />

    <div class="relative -mt-12 lg:-mt-24">
      <div class="wave" :style="waveStyle" style="background-image: url('/bg-wave.webp');"></div>
    </div>
  </div>
</template>

<script>
import HeroContent from '~/components/HeroContent'

export default {
  name: 'Hero',
  components: {
    'hero-content': HeroContent,
  },
  setup() {
    const waveStyle = {
      height: '42rem',
      'margin-top': '-29rem',
    }
    return {
      waveStyle,
    }
  },
}
</script>

<style lang="scss" scoped>
.hero {
  background: #d9ebff;
}
</style>

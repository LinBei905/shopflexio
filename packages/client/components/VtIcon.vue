<template>
  <component :is="is" class="vt-icon" v-bind="attrs" v-on="$listeners"> </component>
</template>

<script lang="ts" setup>
import { computed, defineComponent, useAttrs } from '@nuxtjs/composition-api'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  clickable: Boolean,
  size: {
    type: String,
    default: undefined,
  },
})
const $attrs = useAttrs()

const is = computed(() => {
  if (!props.icon) {
    console.warn('Fail to find icon: ', props.icon)
    return 'i'
  }
  const prefix = props.icon.substring(0, props.icon.indexOf('-'))
  switch (prefix) {
    case 'fai':
      return 'font-awesome-icon'
    case 'svg':
      return 'img'
    case 'img':
      return 'img'
  }

  return props.icon.startsWith('http') ? 'img' : 'i'
})

const attrs = computed(() => {
  const _icon = props.icon
  if (!_icon) {
    return {}
  }
  const clickable = props.clickable
  const size = `vt-icon-${props.size || 'default'}`
  const name = _icon.substring(props.icon.indexOf('-') + 1)

  if (_icon.startsWith('fai-')) {
    return {
      icon: name,
      class: { clickable, size },
    }
  } else if (_icon.startsWith('el-')) {
    return {
      class: [_icon, size, { clickable }],
    }
  } else if (_icon.startsWith('svg-')) {
    return {
      src: require(`../../assets/svgs/${name}.svg`),
    }
  } else if (_icon.startsWith('http')) {
    return {
      src: _icon,
    }
  } else if (_icon.startsWith('img-')) {
    return {
      src: name,
    }
  }
  return {
    ...$attrs,
    class: ['fa', _icon, size, { clickable }],
  }
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'VtIcon',
})
</script>

<style lang="scss">
.vt-icon {
  &.clickable {
    cursor: pointer;
  }

  &.vt-icon-2xs {
    font-size: 12px;
  }

  &.vt-icon-1xs {
    font-size: 14px;
  }
  &.vt-icon-xs {
    font-size: 16px;
  }
  &.vt-icon-lg {
    font-size: 20px;
  }
  &.vt-icon-xl {
    font-size: 24px;
  }
  &.vt-icon-2xl {
    font-size: 28px;
  }
}
</style>

<template>
  <no-ssr class="vue-editor">
    <quill-editor :options="editorOptions" :value="value" @change="handleChange" />
  </no-ssr>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
// eslint-disable-next-line import/no-named-as-default
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module'

const Parchment = Quill.import('parchment')
class IndentAttributor extends Parchment.Attributor.Style {
  add(node, value) {
    if (value === 0) {
      // @ts-ignore
      this.remove(node)
      return true
    } else {
      return super.add(node, `${value}em`)
    }
  }
}

// @ts-ignore
let IndentStyle = new IndentAttributor('indent', 'text-indent', {
  scope: Parchment.Scope.BLOCK,
  whitelist: ['1em', '2em', '3em', '4em', '5em', '6em', '7em', '8em', '9em'],
})

const customs = [
  Quill.import('attributors/style/background'),
  Quill.import('attributors/style/color'),
  Quill.import('attributors/style/font'),
  Quill.import('attributors/style/size'),
  Quill.import('attributors/style/direction'),
  Quill.import('attributors/style/align'),
  // Quill.import('attributors/style/indent'),
]

Quill.register(IndentStyle, true)
Quill.register('modules/imageResize', ImageResize)

// console.log('image: ', ImageResize)

customs.forEach((c) => Quill.register(c, true))
export default defineComponent({
  name: 'VueQuillEditor',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const editorOptions = {
      modules: {
        imageResize: {},
      },
    }
    const handleChange = (v) => emit('change', v)
    return {
      editorOptions,
      handleChange,
    }
  },
})
</script>

<style lang="scss" scoped></style>

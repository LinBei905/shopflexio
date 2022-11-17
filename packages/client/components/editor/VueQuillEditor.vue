<template>
  <no-ssr class="vue-editor">
    <quill-editor v-model="html" :options="editorOption" />
  </no-ssr>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
// eslint-disable-next-line import/no-named-as-default
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module'

Quill.register('modules/imageResize', ImageResize)

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
    const html = ref(props.value)
    watch(html, () => handleChange(html.value))
    const handleChange = (v) => emit('change', v)
    const editorOption = {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          // [{ font: ['roboto'] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['clean'],
          ['link', 'image', 'video'],
        ],
      },
    }

    return {
      html,
      handleChange,
      editorOption,
    }
  },
})
</script>

<style lang="scss" scoped></style>

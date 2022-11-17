<template>
  <div class="blog-editor">
    <ElDialog
      title="Configuration"
      :visible="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
      append-to-body
      @close="() => (visible = false)"
    >
      <div>
        <ElForm :model="form">
          <ElFormItem required prop="title" label="Title">
            <ElInput
              v-model="form.title"
              :maxlength="200"
              :minlength="0"
              show-word-limit
              type="textarea"
            />
          </ElFormItem>

          <ElFormItem required prop="cover" label="Cover">
            <Upload v-model="form.cover" />
          </ElFormItem>

          <ElFormItem>
            <ElButton :loading="isLoading" type="primary" size="medium" @click="handleConfirm">
              Confirm
            </ElButton>
            <ElButton size="medium" @click="() => (visible = false)">
              Cancel
            </ElButton>
          </ElFormItem>
        </ElForm>
      </div>
    </ElDialog>

    <div class="flex justify-end mb-4">
      <ElButton @click="handlePreview">
        Preview
      </ElButton>

      <ElButton type="primary" @click="handlePublish">
        Publish
      </ElButton>
    </div>
    <div class="flex">
      <div class="left flex-1">
        <ElForm :model="form">
          <ElRow>
            <ElFormItem required prop="content"></ElFormItem>
            <VueQuillEditor v-model="form.content" />
          </ElRow>
        </ElForm>
      </div>

      <div class="right flex-1">
        <div class="ql-container ql-snow">
          <div class="ql-editor">
            <div v-html="form.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'

import { useLoading } from '~/composables'

import Upload from './_Upload.vue'

export default defineComponent({
  name: 'BlogEditor',
  components: { Upload },
  setup() {
    const form = ref({
      title: '',
      cover: '',
      content: '',
    })
    const { isLoading, run } = useLoading()

    const isDirty = ref(false)
    const visible = ref(false)

    const handler = () => {
      if (isDirty.value) window.localStorage.setItem('editing-blog', JSON.stringify(form.value))
    }
    const timer = ref<any>(null)

    onMounted(() => {
      timer.value = setInterval(handler, 1000)
    })

    onBeforeUnmount(() => timer.value && clearInterval(timer.value) && (timer.value = null))

    watch(
      form,
      () => {
        isDirty.value = true
      },
      { deep: true },
    )

    const handlePublish = () => {
      visible.value = true
      // run(Promise.resolve())
    }
    const handlePreview = () => {
      window.sessionStorage.setItem('blog-preview', JSON.stringify(form.value))
      window.open('/blog/preview', '_blank')
    }

    const handleConfirm = () => {
      visible.value = false
      run(Promise.resolve())
    }
    return {
      form,
      isLoading,
      visible,
      handleConfirm,
      handlePublish,
      handlePreview,
    }
  },
})
</script>

<style lang="scss" scoped></style>

<template>
  <div class="image-field">
    <ElUpload
      drag
      action="https://api.shopflex.io/fileUpload"
      :on-remove="onRemove"
      accept="image/*"
      :http-request="onUpload"
      :before-upload="beforeUpload"
      :multiple="false"
    >
      <!-- <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="value" />
      </div> -->

      <div v-loading="isLoading" class="vt-wh-full">
        <div v-if="imgUrl" class="vt-wh-full">
          <img class="vt-wh-full" style="object-fit: contain;" :src="imgUrl" />
        </div>
        <div v-else>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        </div>
      </div>

      <div slot="tip" class="el-upload__tip">
        <!-- <div style="line-height: 1.5;">Suggested dimensions: {{ width }} x {{ height }}.</div> -->
        <div style="line-height: 1.5;">
          Max file size: {{ displaySize }}. Accepted formats: JPG/JPEG, GIF, and PNG.
          <!-- <a href="https://tinypng.com" target="_blank" rel="noopener noreferrer">
            <i class="el-icon-info"></i>
          </a> -->
        </div>

        <div>
          <ElButton size="medium" @click="onRemove">
            Remove
          </ElButton>
        </div>
      </div>

      <div slot="file"></div>
    </ElUpload>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

import { useI18n } from '~/composables'
import { useLoading, useMessage } from '~/hooks'

export default defineComponent({
  name: 'ImageField',
  model: {
    prop: 'value',
  },
  props: {
    width: {
      type: Number,
      // default: 60,
    },
    height: {
      type: Number,
      // default: 60,
    },
    value: String,
  },
  setup(props, { emit }) {
    const imgUrl = ref(props.value)
    const fileList = ref([])
    const { isLoading, run } = useLoading()
    const { error } = useMessage()
    const { $t3 } = useI18n()
    const onRemove = () => {
      imgUrl.value = ''
      emit('input', imgUrl.value)
      emit('change', imgUrl.value)
    }

    const size = 1024 * 1024 * 2
    const exceedMessage = {
      en: 'Picture size can not exceed 2M!',
      zh: '图片大小不能超过 2M！',
    }
    const displaySize = '2M'

    // @ts-ignore
    const beforeUpload = (file) => {
      const isOk = file.size / size

      if (!isOk) {
        error($t3(exceedMessage))
      }
      return isOk
    }

    // @ts-ignore
    const onUpload = async (req) => {
      const body = new FormData()
      body.append('file', req.file)

      const res = await run(
        fetch(req.action, {
          method: 'post',
          body,
        }).then((res) => res.json()),
      )
      const url = res.data
      imgUrl.value = url
      emit('input', url)
      emit('change', url)
    }

    const onChange = (val: string) => {
      imgUrl.value = val
      emit('change', val)
      emit('input', val)
    }

    watch(
      () => props.value,
      (value) => {
        if (value !== imgUrl.value) imgUrl.value = value
      },
    )
    return {
      fileList,
      imgUrl,
      isLoading,
      size,
      displaySize,
      beforeUpload,
      onRemove,
      onUpload,
      onChange,
    }
  },
})
</script>

<style lang="scss" scoped></style>

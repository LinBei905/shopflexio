<template>
  <div class="news mt-20 flex content-center" style="min-height: calc(100vh - 72px); justify-content: center;">
    <!-- <h1 class="w-full mb-4 text-5xl font-bold leading-tight text-center text-gray-800">
      News
    </h1> -->
    <div class="flex new-blog-text min-w-6xl mb-4 font-bold leading-tight text-gray-800" style="width: 78rem">
      <div class="blog-container-md inline-block" style="width: 49%">
        <div class="mb-0 flex">
          <el-button type="primary" @click="textMd = ''">clear</el-button>
        </div>
        <el-input v-model="textMd" type="textarea" placeholder=""></el-input>
      </div>
      <div class="blog-container-html inline-block" style="width: 49%">
        <div class="mb-0 flex">
          <el-button type="primary" @click="sync(), mode = 'raw'">HTML</el-button>
          <el-button type="primary" @click="sync(), mode = 'preview'">Preview</el-button>
        </div>
        <div style="border: 1px solid #dcdfe6; height: 400px;">
          <!-- <span style="font-size: 16px">{{ textHtml }}</span> -->
          <el-input v-if="mode === 'raw'" v-model="textHtml" type="textarea" placeholder=""></el-input>
          <span v-if="mode === 'preview'" v-html="textHtml"></span>
        </div>
        <!-- <el-input readonly :value="textHtml" type="textarea" :rows="20" placeholder=""><span v-html="textHtml"></span></el-input> -->
      </div>
    </div>
    <!-- <span v-html="textHtml"></span> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

</script>

<style lang="scss" scoped>
.list {
  max-width: 1320px;
  margin: auto;
}
</style>

<style lang="scss">
.new-blog-text {
  .el-textarea {
    width: 100%;

    textarea {
      height: 400px;
    }
  }
  .blog-container-html, .blog-container-md {
    button {
      line-height: 0;
    }
  }
}
</style>

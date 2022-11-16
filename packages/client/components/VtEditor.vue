<template>
  <div class="vt-editor">
    <div class="left">
      <el-form :model="blogData">
        <el-form-item label="Title" prop="title">
          <el-input v-model="blogData.title" />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input type="textarea" v-model="blogData.description" />
        </el-form-item>

        <div class="editor">
          <vue-editor v-model="blogData.content" style="height: 100%;" />
        </div>
      </el-form>
    </div>

    <div class="right">
      <section class="blog">
        <h1>
          {{ blogData.title }}
        </h1>
        <p>
          {{ blogData.description }}
        </p>
      </section>

      <div>
        <div v-html="blogData.content" class="ql-snow ql-editor"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import VueEditor from './editor/VueQuillEditor.vue'

function getInitData() {
  return {
    title: '',
    description: '',
    cover: '',
    content: '',
    tags: [],
  }
}

export default defineComponent({
  components: { VueEditor },
  props: {
    blog: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const blogData = ref<any>({})

    onMounted(() => {
      blogData.value = {
        ...getInitData(),
        ...props.blog,
      }
    })
    return { blogData }
  },
})
</script>

<style lang="scss" scoped>
.vt-editor {
  display: flex;
  .left,
  .right {
    width: 50%;
  }

  .left {
    min-width: 640px;
    .editor {
      height: 60vh;
    }
  }
}
</style>

<style>
@import 'quill/dist/quill.snow.css';
</style>

<template>
  <div class="blogs-page mt-4 px-4 lg:px-0">
    <article class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 max-w-6xl m-auto">
      <nuxt-link v-for="item in formattedList" :key="item.id" style="cursor: pointer;" :to="`/test/${item.slug}`">
        <article>
          <el-image style="min-height: 200px;" :src="item.cover" :alt="item.title" />
          <div class="tags mt-3 mb-4 flex gap-2">
            <div
              v-for="tag in item.tags"
              :key="tag"
              class="border border-solid border-black rounded-full px-5 text-lg"
              style="line-height: 1.7;"
            >
              <span>
                {{ tag }}
              </span>
            </div>
          </div>

          <h5 class="font-bold text-xl mb-2" style="color: #181818;">
            {{ item.slug + item.extension }}
          </h5>

          <time class="text-gray-400">
            {{ $d(item.updated_time) }}
          </time>
        </article>
      </nuxt-link>
      <nuxt-content :document="page" />
    </article>
  </div>
</template>

<script>
import { computed, defineComponent, useAsync } from '@nuxtjs/composition-api'

  export default {
    setup() {
      // const blogData = useAsync(() => {
      //   return getBlogData()
      // })
      // const list = computed(() => {
      //   const res = getBlogs()
      //   console.log(res)
      //   // const res = blogData.value?.list || []
      //   return res
      //   return res.sort((a, b) => {
      //     if (a.order == b.order) {
      //       return a.updatedAt - b.updatedAt
      //     }

      //     return Number(a.order) - Number(b.order)
      //   })
      // })
      // const formattedList = computed(() => list.value.filter((b) => b.published))
      // const formattedList = list

      // return { getBlogs }
    },
    data() {
      return {
        blogs: [],
        page: {}
      }
    },
    computed: {
      list() {
        return this.blogs
      },
      formattedList() {
        return this.blogs
      }
    },
    async mounted() {
      this.blogs = await this.$content().fetch()
      // this.page = await this.$content('sample').fetch()
      console.log(this.blogs)
    },
    methods: {
      async openBlog(item) {
        console.log(item)
        this.page = await this.$content(item.slug).fetch()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
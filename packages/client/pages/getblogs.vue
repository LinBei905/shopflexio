<template>
  <div class="getblogs-container">
    <div v-for="blog in blogs" :key="blog.index">
      <div class="img-container">{{ blog.cover }}</div>
    </div>
  </div>
</template>
<script>
import blog1 from '../static/blogs/blog1.json'
import blog2 from '../static/blogs/blog2.json'
export default {
  name: "Getblogs",
  data() {
    return {
      blogs
    }
  },
  mounted() {
    this.blogs = [blog1, blog2]
    console.log(blog1)
  }
}
</script>
<template>
  <div>
    111
    <div></div>
  </div>
</template>

<script>
  export default {
    async mounted() {
      const title = await this.$content('sample').fetch()
      console.log(title)
    }

  }
</script>

<style lang="scss" scoped>

</style>
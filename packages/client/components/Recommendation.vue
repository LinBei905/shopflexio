<template>
  <!--  overflow-x-hidden -->
  <div class="bg-white overflow-x-hidden">
    <div class="flex justify-between items-center mx-auto max-w-6xl pb-4">
      <div class="box flex items-center relative" @click="setIndex(0)">
        <img src="~/assets/images/recommendation1.png" alt="" srcset="">
        <svg class="absolute bottom-0 left-0 right-0 m-auto" v-show="index == 0" width="161" height="5"
          viewBox="0 0 161 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="161" height="5" rx="2.5" fill="#3C6EEF" />
        </svg>
      </div>
      <div class="box flex items-center relative" @click="setIndex(1)">
        <img src="~/assets/images/recommendation2.png" alt="" srcset="">
        <svg class="absolute bottom-0 left-0 right-0 m-auto" v-show="index == 1" width="161" height="5"
          viewBox="0 0 161 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="161" height="5" rx="2.5" fill="#3C6EEF" />
        </svg>
      </div>
      <div class="box flex items-center relative" @click="setIndex(2)">
        <img src="~/assets/images/recommendation3.png" alt="" srcset="">
        <svg class="absolute bottom-0 left-0 right-0 m-auto" v-show="index == 2" width="161" height="5"
          viewBox="0 0 161 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="161" height="5" rx="2.5" fill="#3C6EEF" />
        </svg>
      </div>
    </div>
    <div class="content flex" :style="offsetLeft">
      <img src="~/assets/images/content1.png" alt="" srcset="">
      <img src="~/assets/images/content2.png" alt="" srcset="">
      <img src="~/assets/images/content3.png" alt="" srcset="">
    </div>
  </div>
</template>

<script>

export default {
  name: "Recommendation",
  data() {
    return {
      index: 0,
    }
  },

  computed: {
    offsetLeft() {
      let i = this.index
      let style = ''
      switch (i) {
        case 0:
          style = `margin-left:calc((100vw - 1152px)/2);`
          break
        case 1:
          style = `margin-left:0px;`
          break
        case 2:
          style = `margin-left:calc((100vw - 1152px)/2 - 2*362px);`
          break
      }
      return style
    }
  },
  methods: {
    setIndex(val) {
      this.index = val
      // switch (val) {
      //   case 0:
      //     this.offsetLeft = 150
      //     break;
      //   case 1:
      //     this.offsetLeft = -40
      //     break;
      //   case 2:
      //     this.offsetLeft = -260
      //     break;

      //   default:
      //     this.offsetLeft = 150
      //     break;
      // }
    }
  },

}
</script>

<style lang="scss" scoped>
.box {
  height: 120px;
}

.content {
  transition: 0.5s all;

  &img+img {
    margin-right: 5px;
  }
}
</style>
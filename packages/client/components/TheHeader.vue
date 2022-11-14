<template>
  <nav :class="headerClassList" class="fixed w-full z-30 top-0">
    <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
      <div class="pl-4 flex items-center">
        <logo :is-stickable="true" :is-sticky="isSticky" />
      </div>
      <div class="block lg:hidden pr-4">
        <button
          class="flex items-center p-1 text-orange-800 hover:text-gray-900"
          @click.prevent.stop="onToggleClick"
        >
          <svg class="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        :class="navContentClassList"
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
      >
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <!-- <li class="mr-3">
            <nuxt-link to="/" class="inline-block py-2 px-4 text-black font-bold no-underline"
              >Home</nuxt-link
            >
          </li> -->
          <!-- <li class="mr-3">
            <nuxt-link to="/news" class="inline-block py-2 px-4 text-black font-bold no-underline"
              >News</nuxt-link
            >
          </li> -->
          <!-- <li class="mr-3">
            <a
              class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
              href="#"
              >link</a
            >
          </li> -->
          <!-- <li class="mr-3">
            <a
              class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
              href="#"
              >link</a
            >
          </li> -->
        </ul>
        <a href="https://ap.shopflex.io/account/login" target="_blank" rel="noopener noreferrer">
          <button
            :class="navActionClassList"
            class="mx-auto lg:mx-0 font-bold rounded-full mt-4 lg:mt-0 py-2 px-4 shadow opacity-75 hover:bg-primary text-black hover:text-white transition-all"
          >
            Try it free
          </button>
        </a>
      </div>
    </div>
    <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
  </nav>
</template>

<script>
import Logo from '~/components/Logo'

export default {
  name: 'TheHeader',
  components: {
    logo: Logo,
  },
  data() {
    return {
      scrollY: 0,
      isOpen: false,
    }
  },
  computed: {
    isSticky() {
      return this.scrollY > 10
    },
  },
  mounted() {
    this.scrollY = window.scrollY
    document.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.onScroll, true)
  },
  methods: {
    onScroll() {
      this.scrollY = window.scrollY
    },
  },
}
</script>

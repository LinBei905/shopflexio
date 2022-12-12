<template>
  <header
    class="fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out"
    
  >
    <div
      class="max-w-6xl mx-auto px-4 lg:px-0 bg-white mt-4"
      style="padding-left: 20px; padding-right: 20px; border-radius: 6px; box-shadow: 0 2px 10px rgb(43 46 50 / 10%)">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- {/* Site branding */} -->
        <div class="flex-shrink-0 mr-4">
          <!-- {/* Logo */} -->
          <nuxt-link to="/" class="font-bold flex" style="font-size: 24px;" aria-label="Cruip">
            <span>
              Shop
            </span>
            <span class="text-primary">Flex</span>
            <!-- <img
              style="width: 32px; height: 32px;"
              class="rounded-full"
              src="/logo.png"
              alt="logo"
            /> -->
            <!-- <svg class="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient
                  id="header-logo"
                  cx="21.152%"
                  cy="86.063%"
                  fx="21.152%"
                  fy="86.063%"
                  r="79.941%"
                >
                  <stop stopColor="#4FD1C5" offset="0%" />
                  <stop stopColor="#81E6D9" offset="25.871%" />
                  <stop stopColor="#338CF5" offset="100%" />
                </radialGradient>
              </defs>
              <rect width="32" height="32" rx="16" fill="url(#header-logo)" fillRule="nonzero" />
            </svg> -->
          </nuxt-link>
        </div>
        <!-- <nuxt-link
          to="/blogs"
          class="bg-gray-200 py-2 px-8 mt-1 font-medium flex items-center transition duration-150 ease-in-out"
          style="border-radius: 8px;"
        >
          Blog
        </nuxt-link> -->

        <!-- {/* Site navigation */} -->
        <nav class="flex flex-grow">
          <ul class="flex flex-grow justify-end flex-wrap items-center">
            <li>
            </li>
            <!-- <li>
              <nuxt-link
                to="/book"
                class="font-medium text-gray-900 hover:text-primary px-5 py-3 flex items-center transition duration-150 ease-in-out"
              >
                Book a Demo
              </nuxt-link>
            </li> -->
            <!-- <li>
              <a
                href="https://shopflex.io/blogs"
                class="btn-sm text-white ml-3 bg-primary"
                target="_blank"
              >
                <span>Blogs</span>
              </a>
            </li> -->
            <li>
              <a
                href="https://ap.shopflex.io/account/login"
                class="btn-sm text-white ml-3 bg-primary"
                target="_blank"
              >
                <span>Try it for free</span>
                <svg
                  class="w-3 h-3 fill-current text-white flex-shrink-0 ml-2 -mr-1"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                    fillRule="nonzero"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Header',
  setup() {
    return {
      scrollY: 0,
      color: ''
    }
  },
  computed: {
    isSticky() {
      // @ts-ignore
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
})
</script>

<style lang="scss" scoped>
.header-btns:hover {
  background-color: #ededed
}
</style>

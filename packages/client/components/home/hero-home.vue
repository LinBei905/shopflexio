<template>
  <div class="hero-home">
    <el-dialog :visible.sync="visible" custom-class="__home-video-dialog" :width="dialogWidth">
      <div className="relative pb-9/16">
        <iframe
          src="https://www.youtube.com/embed/U8kfxJV6qg0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="w-full border-none"
          style="height: 50vh;"
        ></iframe>
      </div>
    </el-dialog>
    <section class="relative">
      <!-- {/* Illustration behind hero content */} -->
      <div
        class="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <!-- <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="illustration-01" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg> -->
      </div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <!-- {/* Hero content */} -->
        <div class="pt-32 pb-12 md:pt-40 md:pb-20">
          <!-- {/* Section header */} -->
          <div class="text-center pb-12 md:pb-16">
            <h1 class="text-4xl font-extrabold leading-tighter tracking-tighter mb-4">
              <span>Ecommerce Automation</span>
              <!-- <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-400"
                >Automation</span
              > -->
            </h1>
            <div class="max-w-5xl mx-auto">
              <p class="text-xl text-gray-600 mb-8">
                ShopFlex Automation, is an e-commerce automation tool that enables you to automate
                tasks and processes within your store and across your apps. It is like Shopify Flow
                but more flexible, allowing you to customize the workflows that work best for you.
              </p>
              <div class="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div>
                  <a
                    class="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
                    href="https://ap.shopflex.io/account/login"
                    target="_blank"
                    >Start free trial</a
                  >
                </div>
                <!-- <div>
                  <a
                    class="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                    href="#0"
                    >Learn more</a
                  >
                </div> -->
              </div>
            </div>
          </div>

          <!-- {/* Hero image */} -->
          <div>
            <div class="relative flex justify-center mb-8">
              <div class="flex flex-col justify-center rounded-lg overflow-hidden">
                <el-image
                  lazy
                  class="mx-auto"
                  style="max-width: 680px;"
                  src="/banner.png"
                  alt="Hero"
                />
                <!-- <svg
                  class="absolute inset-0 max-w-full mx-auto md:max-w-none h-auto"
                  width="768"
                  height="432"
                  viewBox="0 0 768 432"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <linearGradient id="hero-ill-a" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop stopColor="#FFF" offset="0%" />
                      <stop stopColor="#EAEAEA" offset="77.402%" />
                      <stop stopColor="#DFDFDF" offset="100%" />
                    </linearGradient>
                    <linearGradient id="hero-ill-b" x1="50%" y1="0%" x2="50%" y2="99.24%">
                      <stop stopColor="#FFF" offset="0%" />
                      <stop stopColor="#EAEAEA" offset="48.57%" />
                      <stop stopColor="#DFDFDF" stopOpacity="0" offset="100%" />
                    </linearGradient>
                    <radialGradient
                      id="hero-ill-e"
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
                    <circle id="hero-ill-d" cx="384" cy="216" r="64" />
                  </defs>
                  <g fill="none" fillRule="evenodd">
                    <circle fillOpacity=".04" fill="url(#hero-ill-a)" cx="384" cy="216" r="128" />
                    <circle fillOpacity=".16" fill="url(#hero-ill-b)" cx="384" cy="216" r="96" />
                    <g fillRule="nonzero">
                      <use fill="#000" xlinkHref="#hero-ill-d" />
                      <use fill="url(#hero-ill-e)" xlinkHref="#hero-ill-d" />
                    </g>
                  </g>
                </svg> -->
              </div>
              <button
                class="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg"
                aria-controls="modal"
                @click="handleClick"
              >
                <svg
                  class="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 flex-shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z"
                  />
                  <path d="M10 17l6-5-6-5z" />
                </svg>
                <span class="ml-3">Watch the video</span>
              </button>
            </div>

            <!-- {/* Modal */} -->
            <!-- <Modal id="modal" ariaLabel="modal-headline" show={videoModalOpen} handleClose={() => setVideoModalOpen(false)}>
              <div class="relative pb-9/16">
                <iframe class="absolute w-full h-full" src="https://player.vimeo.com/video/174002812" title="Video" allowFullScreen></iframe>
              </div>
            </Modal> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'

import { isClient } from '~/shared'

// import { isMobile as _isMobile } from '~/shared'

export default defineComponent({
  name: 'HeroHome',
  setup() {
    const visible = ref(false)
    const handleClick = () => {
      visible.value = true
    }

    const dialogWidth = computed(() => {
      if (!isClient()) return null

      return window.screen.width < 600 ? '92%' : null
    })

    return { visible, dialogWidth, handleClick }
  },
})
</script>

<style lang="scss">
.__home-video-dialog {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
  }
}
</style>

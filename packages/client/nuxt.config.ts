import type { NuxtConfig } from '@nuxt/types'
import { config } from 'dotenv'
import webpack from 'webpack'

import pkg from './package.json'

// Setup dotenv
config()

// eslint-disable-next-line no-process-env
const basePath = process.env.BASE_PATH || '/'
const nuxtConfig: NuxtConfig = {
  ssr: true,
  target: 'static',
  server: {
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
    port: 8003,
  },
  /** Headers of the page */
  head: {
    // titleTemplate: `ShopFlex`,
    title: 'Shopflex - B2B and Omni-Channel Selling SaaS',
    meta: [{ charset: 'utf-8' }],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `${basePath}favicon.ico`,
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        crossOrigin: 'anonymous',
        href: 'https://fonts.googleapis.com/css?family=Roboto',
      },
    ],
  },
  /** Customize the progress-bar color */
  loading: { color: '#fff' },
  /** Global CSS */
  css: ['~/assets/styles/main.scss'],
  /** Plugins to load before mounting the App */
  plugins: [
    { src: '~plugins/element-ui', ssr: true },
    { src: '~plugins/components.client', ssr: false },
    { src: '~plugins/quill.client', ssr: false },
    // { src: '~plugins/quill-editor.client', ssr: false },
    { src: '~plugins/aos.client', ssr: false },
  ],
  /** Nuxt.js dev-modules */
  buildModules: [
    // Doc: https://typescript.nuxtjs.org/
    ['@nuxt/typescript-build', { typeCheck: false }],
    // Doc: https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
    '@nuxtjs/svg',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  router: {
    base: '/',
  },
  /** Nuxt.js modules */
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        flag: 'us',
        name: 'English',
        file: 'en.json',
      },
      { code: 'zh', iso: 'zh-CN', flag: 'zh', name: '中文', file: 'zh.json' },
    ],

    defaultLocale: 'en',
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      dateTimeFormats: {
        en: {
          long: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          },
        },
        zh: {
          long: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          },
        },
      },
    },
    strategy: 'no_prefix',
    vueI18nLoader: true,
  },
  /* eslint-disable no-process-env */
  publicRuntimeConfig: {
    basePath,
  },
  privateRuntimeConfig: {
    nodeEnv: process.env.NODE_ENV,
  },
  tailwindcss: {
    viewer: false,
  },

  /* eslint-enable no-process-env */
  /** Build configuration */
  build: {
    standalone: true,

    plugins: [
      // new webpack.ProvidePlugin({
      //   // global modules
      //   'window.Quill': 'quill/dist/quill.js',
      //   Quill: 'quill/dist/quill.js',
      // }),
    ],
    transpile: ['slate-vue', 'vue-tsx-support'],

    loaders: { scss: { sassOptions: { quietDeps: true } } },
    postcss: {
      plugins: {
        tailwindcss: {},
        'postcss-import': {},
      },
      preset: {
        autoprefixer: {
          grid: false,
        },
      },
    },
  },
}

export default nuxtConfig

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '@/assets/main.css',
    '@/assets/styles.scss'
  ],
  build: {
    transpile: ['pinia'],
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui'
  ],
  typescript: {
    shim: false,
  },
})

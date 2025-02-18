export default defineNuxtConfig({
  app: {
    head: {
      title: 'Multilingual Character & Word Counter',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Modern multilingual character and word counter supporting English, Bengali, Hindi, and Chinese' 
        }
      ]
    }
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'bn', iso: 'bn-BD', name: 'বাংলা' },
      { code: 'hi', iso: 'hi-IN', name: 'हिन्दी' },
      { code: 'zh', iso: 'zh-CN', name: '中文' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix'
  },
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
  ],
  pwa: {
    manifest: {
      name: 'Multilingual Counter',
      short_name: 'MultiCount',
      description: 'Multilingual character and word counter',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icons/icon-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    }
  },

  compatibilityDate: '2025-02-18'
})
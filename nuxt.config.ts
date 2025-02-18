import { fileURLToPath } from 'url'
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
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'bn', file: 'bn.json', name: 'বাংলা' },
      { code: 'hi', file: 'hi.json', name: 'हिन्दी' },
      { code: 'zh', file: 'zh.json', name: '中文' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: fileURLToPath(new URL('./locales/', import.meta.url)), // Path to JSON files
    strategy: 'no_prefix', // No URL prefix needed
    detectBrowserLanguage: {
      useCookie: true, // Store selected language in a cookie
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'en'
    }
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
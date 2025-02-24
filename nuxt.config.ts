import { fileURLToPath } from 'url'
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      title: 'Multilingual Character & Word Counter',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'description',
          content: 'Modern multilingual character and word counter supporting English, Bengali, Hindi, and Chinese'
        },
        {
          name: 'keywords',
          content: 'word counter, character counter, multilingual, Bengali, Hindi, Chinese, English, text tools'
        },
        { property: 'og:title', content: 'Multilingual Character & Word Counter' },
        { property: 'og:description', content: 'Modern multilingual character and word counter supporting English, Bengali, Hindi, and Chinese' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Multilingual Character & Word Counter' },
        { name: 'twitter:description', content: 'Modern multilingual character and word counter supporting English, Bengali, Hindi, and Chinese' },
        { name: 'theme-color', content: '#3B82F6' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://your-domain.com' },
        { rel: 'apple-touch-icon', href: '/icon-192x192.png' },
        { rel: 'manifest', href: '/manifest.json' }
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
    '@nuxtjs/sitemap'
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
  site: {
    url: 'https://your-domain.com'
  },
  sitemap: {
    enabled: true,
    urls: [],
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    defaults: {
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString()
    }
  },
  compatibilityDate: '2025-02-18'
})
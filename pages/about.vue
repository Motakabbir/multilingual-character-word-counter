<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-3xl mx-auto">
      <div class="mb-12 text-center fade-in-section">
        <h1 class="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-primary">
          {{ t('about.title') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">{{ t('about.description') }}</p>
      </div>
      
      <div class="space-y-12">
        <!-- Mission Section -->
        <section class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow fade-in-section">
          <h2 class="text-3xl font-bold mb-6 flex items-center text-primary dark:text-primary">
            <RocketLaunchIcon class="h-8 w-8 mr-3" />
            {{ t('about.mission.title') }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">{{ t('about.mission.content') }}</p>
        </section>

        <!-- Features Section -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-fade">
          <div v-for="(feature, index) in features" :key="index" 
               class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 fade-in-section">
            <div class="flex items-start">
              <CheckCircleIcon class="h-6 w-6 text-primary mt-1 mr-3 flex-shrink-0" />
              <p class="text-gray-600 dark:text-gray-300">{{ t(feature) }}</p>
            </div>
          </div>
        </section>

        <!-- Languages Section -->
        <section class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg fade-in-section">
          <h2 class="text-3xl font-bold mb-6 flex items-center text-primary dark:text-primary">
            <GlobeAltIcon class="h-8 w-8 mr-3" />
            {{ t('about.languages.title') }}
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="lang in languages" :key="lang.code" 
                 class="flex items-center space-x-2 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 
                        backdrop-blur-sm hover:bg-primary/5 dark:hover:bg-primary/10 
                        transition-colors cursor-default">
              <GlobeAltIcon class="h-5 w-5 text-primary" />
              <span class="text-gray-900 dark:text-gray-100 font-medium">{{ lang.name }}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon, GlobeAltIcon, RocketLaunchIcon } from '@heroicons/vue/24/outline'
const { t, locales } = useI18n()

const features = [
  'about.features.realtime',
  'about.features.multilingual',
  'about.features.offline',
  'about.features.export',
  'about.features.darkMode'
]

const languages = computed(() => locales.value)

useHead({
  title: computed(() => `${t('about.title')} - ${t('title')}`),
})

useSeoMeta({
  title: computed(() => `${t('about.title')} - ${t('title')}`),
  description: computed(() => t('about.description')),
})

useScrollAnimation()
</script>
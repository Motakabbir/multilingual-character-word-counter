<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-3xl mx-auto">
      <div class="mb-12 text-center fade-in-section">
        <h1 class="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-primary">
          {{ t('privacy.title') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">{{ t('privacy.description') }}</p>
      </div>
      
      <div class="space-y-8 stagger-fade">
        <section v-for="(section, index) in sections" :key="index" 
                 class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 fade-in-section">
          <h2 class="text-2xl font-bold mb-4 flex items-center text-primary dark:text-primary">
            <component :is="sectionIcons[index]" class="h-6 w-6 mr-3" />
            {{ t(section.title) }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6">{{ t(section.content) }}</p>
          
          <ul v-if="section.items" class="space-y-4">
            <li v-for="(item, idx) in section.items" :key="idx" 
                class="flex items-start p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 group hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">
              <ShieldCheckIcon class="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span class="text-gray-600 dark:text-gray-300">{{ t(item) }}</span>
            </li>
          </ul>
        </section>

        <section class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg fade-in-section">
          <h2 class="text-2xl font-bold mb-4 flex items-center text-primary dark:text-primary">
            <EnvelopeIcon class="h-6 w-6 mr-3" />
            {{ t('privacy.contact.title') }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            {{ t('privacy.contact.content') }}
            <a href="mailto:privacy@example.com" 
               class="text-primary hover:text-primary/80 ml-1 inline-flex items-center group">
              privacy@example.com
              <ArrowTopRightOnSquareIcon class="h-4 w-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ShieldCheckIcon,
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon,
  LockClosedIcon,
  DocumentChartBarIcon,
  ServerIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'

const { t } = useI18n()

const sections = [
  {
    title: 'privacy.collection.title',
    content: 'privacy.collection.content',
    items: [
      'privacy.collection.items.noStorage',
      'privacy.collection.items.browser',
      'privacy.collection.items.cookies'
    ]
  },
  {
    title: 'privacy.usage.title',
    content: 'privacy.usage.content'
  },
  {
    title: 'privacy.security.title',
    content: 'privacy.security.content',
    items: [
      'privacy.security.items.encryption',
      'privacy.security.items.protection'
    ]
  },
  {
    title: 'privacy.changes.title',
    content: 'privacy.changes.content'
  }
]

const sectionIcons = [
  DocumentChartBarIcon,
  ServerIcon,
  LockClosedIcon,
  ClockIcon
]

useHead({
  title: computed(() => `${t('privacy.title')} - ${t('title')}`),
})

useSeoMeta({
  title: computed(() => `${t('privacy.title')} - ${t('title')}`),
  description: computed(() => t('privacy.description')),
})

useScrollAnimation()
</script>
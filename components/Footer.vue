<template>
  <footer class="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-section stagger-fade">
        <!-- About Section -->
        <div class="fade-in-section">
          <h3 class="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-primary">
            {{ t('footer.about.title') }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ t('footer.about.description') }}
          </p>
          <div class="mt-4">
            <SocialIcons />
          </div>
        </div>

        <!-- Quick Links -->
        <div class="fade-in-section">
          <h3 class="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-primary">
            {{ t('footer.links.title') }}
          </h3>
          <ul class="space-y-2">
            <li v-for="item in footerLinks" :key="item.path">
              <NuxtLink 
                :to="item.path"
                class="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors flex items-center group"
              >
                <component 
                  :is="item.icon" 
                  class="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" 
                />
                {{ t(item.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="fade-in-section">
          <h3 class="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-primary">
            {{ t('footer.connect.title') }}
          </h3>
          <div class="space-y-4">
            <a href="mailto:support@example.com" 
               class="text-gray-600 dark:text-gray-300 flex items-center group hover:text-primary dark:hover:text-primary transition-colors">
              <EnvelopeIcon class="h-5 w-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
              support@example.com
            </a>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer"
               class="text-gray-600 dark:text-gray-300 flex items-center group hover:text-primary dark:hover:text-primary transition-colors">
              <GlobeAltIcon class="h-5 w-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
              www.example.com
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p class="text-center text-gray-600 dark:text-gray-300 fade-in-section">
          {{ t('footer.copyright', { year: new Date().getFullYear() }) }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { 
  EnvelopeIcon, 
  GlobeAltIcon,
  HomeIcon,
  InformationCircleIcon,
  DocumentTextIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'

const { t } = useI18n()

const footerLinks = [
  { path: '/', label: 'nav.home', icon: HomeIcon },
  { path: '/about', label: 'nav.about', icon: InformationCircleIcon },
  { path: '/terms', label: 'nav.terms', icon: DocumentTextIcon },
  { path: '/privacy', label: 'nav.privacy', icon: ShieldCheckIcon }
]

useScrollAnimation()
</script>
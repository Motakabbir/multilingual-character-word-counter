<template>
  <header class="bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-primary backdrop-blur-sm shadow sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-2 group">
          <DocumentTextIcon class="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
          <span class="text-xl font-bold text-white">
            {{ t('title') }}
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink 
            v-for="item in navigationItems" 
            :key="item.path"
            :to="item.path"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 relative"
            :class="[
              route.path === item.path 
                ? 'text-white font-medium ' 
                : 'text-gray-100 hover:text-white'
            ]"
          >
            <component 
              :is="item.icon" 
              class="h-5 w-5"
              :class="route.path === item.path ? 'text-white' : ''"
            />
            <span>{{ t(item.label) }}</span>
            <div
              v-if="route.path === item.path"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full animate-slide-in"
            />
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-4">
          <LanguageSelector />
          <DarkModeToggle />
          <MobileMenu :items="navigationItems" />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { 
  DocumentTextIcon,
  HomeIcon,
  InformationCircleIcon,
  DocumentTextIcon as TermsIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()

const navigationItems = [
  { path: '/', label: 'nav.home', icon: HomeIcon },
  { path: '/about', label: 'nav.about', icon: InformationCircleIcon },
  { path: '/terms', label: 'nav.terms', icon: TermsIcon },
  { path: '/privacy', label: 'nav.privacy', icon: ShieldCheckIcon }
]
</script>

<style scoped>
@keyframes slide-in {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out forwards;
  transform-origin: left;
}
</style>
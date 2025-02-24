<template>
  <nav v-if="route.path !== '/'" 
       class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
    <div class="container mx-auto px-4">
      <ol class="flex items-center space-x-2 py-3 overflow-x-auto scrollbar-none">
        <li>
          <NuxtLink 
            to="/"
            class="text-primary hover:text-primary/80 transition-colors flex items-center group"
            @click="smoothScroll"
          >
            <HomeIcon class="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span class="sr-only">{{ t('nav.home') }}</span>
          </NuxtLink>
        </li>
        <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
          <ChevronRightIcon class="h-5 w-5 text-gray-400 flex-shrink-0" />
          <NuxtLink
            :to="crumb.path"
            class="ml-2 whitespace-nowrap transition-all duration-200 flex items-center"
            :class="[
              index === breadcrumbs.length - 1 
                ? 'font-semibold text-primary dark:text-primary pointer-events-none'
                : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            ]"
            @click="smoothScroll"
          >
            <component 
              :is="getBreadcrumbIcon(crumb.path)" 
              class="h-4 w-4 mr-1.5 flex-shrink-0"
              :class="index === breadcrumbs.length - 1 ? 'text-primary' : ''"
            />
            {{ t(crumb.label) }}
          </NuxtLink>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { 
  HomeIcon, 
  ChevronRightIcon,
  InformationCircleIcon,
  DocumentTextIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/solid'
import { useRoute } from 'vue-router'

const route = useRoute()
const { t } = useI18n()

const breadcrumbs = computed(() => {
  const path = route.path
  const segments = path.split('/').filter(Boolean)
  
  return segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/')
    return {
      path,
      label: `nav.${segment}`
    }
  })
})

const getBreadcrumbIcon = (path: string) => {
  switch (path) {
    case '/about':
      return InformationCircleIcon
    case '/terms':
      return DocumentTextIcon
    case '/privacy':
      return ShieldCheckIcon
    default:
      return HomeIcon
  }
}

const smoothScroll = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
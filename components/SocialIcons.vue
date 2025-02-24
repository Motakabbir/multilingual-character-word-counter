<template>
  <div class="flex space-x-4">
    <a v-for="link in socialLinks" 
       :key="link.name"
       :href="link.url"
       :aria-label="link.name"
       target="_blank"
       rel="noopener noreferrer"
       class="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
      <component :is="link.icon" class="h-6 w-6" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { GlobeAltIcon } from '@heroicons/vue/24/outline'

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: defineAsyncComponent(() => import('@heroicons/vue/24/outline').then(m => m.CodeBracketIcon))
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: defineAsyncComponent(() => import('@heroicons/vue/24/outline').then(m => m.ChatBubbleBottomCenterTextIcon))
  },
  {
    name: 'Website',
    url: 'https://yourwebsite.com',
    icon: GlobeAltIcon
  }
]
</script>
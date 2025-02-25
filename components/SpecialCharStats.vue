<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
      {{ t('stats.specialChars') }}
    </h3>
    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
      <div v-for="(count, char) in sortedChars" 
           :key="char"
           class="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 
                  hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors cursor-pointer"
           @click="copyToClipboard(`${char}: ${count}`)"
           :title="t('copyToClipboard')">
        <span class="text-lg font-bold text-purple-600 dark:text-purple-400">{{ char }}</span>
        <span class="text-sm text-gray-600 dark:text-gray-300">{{ count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from '~/composables/useToast'

const { t } = useI18n()
const { showToast } = useToast()

const props = defineProps<{
  specialChars: { [key: string]: number }
}>()

const sortedChars = computed(() => {
  const entries = Object.entries(props.specialChars)
  return Object.fromEntries(
    entries.sort(([a], [b]) => a.localeCompare(b))
  )
})

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    showToast(t('copied'), 'success')
  } catch (error) {
    showToast(t('error'), 'error')
  }
}
</script>
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="mb-8 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ $t('title') }}
        </h1>
        <div class="flex gap-4">
          <LanguageSelector />
          <DarkModeToggle />
        </div>
      </header>

      <!-- Text Input -->
      <div class="mb-6">
        <textarea
          v-model="text"
          :placeholder="$t('placeholder')"
          class="w-full h-64 p-4 rounded-lg border border-gray-300 dark:border-gray-700 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-primary focus:border-transparent
                 transition-colors duration-200"
          @input="onTextInput"
        ></textarea>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard 
          :title="$t('characters')"
          :value="stats.characters"
          icon="char"
        />
        <StatCard 
          :title="$t('words')"
          :value="stats.words"
          icon="word"
        />
        <StatCard 
          :title="$t('lines')"
          :value="stats.lines"
          icon="line"
        />
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-4">
        <button
          @click="copyText"
          class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark
                 transition-colors duration-200"
        >
          {{ $t('copy') }}
        </button>
        <button
          @click="exportStats"
          class="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark
                 transition-colors duration-200"
        >
          {{ $t('export') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '~/stores/counter'

const counter = useCounterStore()
const { t,locale, availableLocales  } = useI18n()

const text = ref('')
const stats = computed(() => counter.stats)

const onTextInput = () => {
  counter.updateText(text.value)
}

const copyText = () => {
  navigator.clipboard.writeText(text.value)
}

const exportStats = () => {
  const data = {
    text: text.value,
    stats: stats.value,
    timestamp: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'text-stats.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
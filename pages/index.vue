<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Keyboard Shortcuts Help -->
      <div v-if="showShortcuts" class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 mb-4 shadow-lg fade-in-section">
        <h2 class="text-lg font-semibold mb-2 text-primary">{{ t('shortcuts.title') }}</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <li v-for="shortcut in shortcuts" :key="shortcut.description" 
              class="flex items-center justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-300">{{ t(shortcut.description) }}</span>
            <kbd class="px-2 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 rounded">
              {{ formatShortcut(shortcut) }}
            </kbd>
          </li>
        </ul>
      </div>

      <!-- Text Input -->
      <div class="relative mb-8 fade-in-section">
        <div class="absolute top-4 right-4 flex items-center gap-2">
          <button v-if="text"
                  @click="clearText"
                  class="p-1.5 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 
                         hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  :title="t('clear')">
            <XMarkIcon class="h-5 w-5" />
          </button>
          <button @click="toggleShortcuts"
                  class="p-1.5 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 
                         hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  :class="{ 'text-primary': showShortcuts }"
                  :title="t('shortcuts.toggle')">
            <CommandLineIcon class="h-5 w-5" />
          </button>
          <div v-if="isProcessing" class="text-primary">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
        
        <textarea
          v-model="text"
          :placeholder="t('placeholder')"
          class="w-full h-64 p-4 rounded-lg border border-gray-300 dark:border-gray-700 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-primary focus:border-transparent
                 shadow-lg hover:shadow-xl transition-all duration-200
                 resize-y min-h-[12rem]"
          :class="{ 'pr-24': text || isProcessing }"
          @input="debouncedInput"
        ></textarea>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 stagger-fade">
        <StatCard 
          v-for="(stat, type) in stats"
          :key="type"
          :title="t(type)"
          :value="stat"
          :icon="type === 'characters' ? 'char' : type === 'words' ? 'word' : 'line'"
          class="fade-in-section"
        />
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-4 fade-in-section">
        <button
          @click="copyText"
          class="btn-primary group"
          :disabled="!text"
        >
          <DocumentDuplicateIcon class="h-5 w-5 mr-2 inline-block group-hover:scale-110 transition-transform" />
          {{ t('copy') }}
        </button>
        <button
          @click="exportStats"
          class="btn-secondary group"
          :disabled="!text"
        >
          <ArrowDownTrayIcon class="h-5 w-5 mr-2 inline-block group-hover:scale-110 transition-transform" />
          {{ t('export') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  DocumentDuplicateIcon, 
  ArrowDownTrayIcon,
  XMarkIcon,
  CommandLineIcon 
} from '@heroicons/vue/24/outline'
import { useCounterStore } from '~/stores/counter'

const counter = useCounterStore()
const { t } = useI18n()
const { showToast } = useToast()
const { registerShortcut, shortcuts } = useKeyboardShortcuts()
useScrollAnimation()

const text = ref('')
const isProcessing = ref(false)
const stats = reactive({
  characters: 0,
  words: 0,
  lines: 0
})

const showShortcuts = ref(false)
const toggleShortcuts = () => {
  showShortcuts.value = !showShortcuts.value
}

const clearText = () => {
  text.value = ''
  updateStats()
}

const formatShortcut = (shortcut: { key: string; ctrl?: boolean; alt?: boolean; shift?: boolean }) => {
  const parts = []
  if (shortcut.ctrl) parts.push('Ctrl')
  if (shortcut.alt) parts.push('Alt')
  if (shortcut.shift) parts.push('Shift')
  parts.push(shortcut.key.toUpperCase())
  return parts.join('+')
}

// Debounced input handler
let debounceTimeout: NodeJS.Timeout
const debouncedInput = (event: Event) => {
  isProcessing.value = true
  clearTimeout(debounceTimeout)
  
  debounceTimeout = setTimeout(() => {
    const target = event.target as HTMLTextAreaElement
    text.value = target.value
    updateStats()
    isProcessing.value = false
  }, 300)
}

const updateStats = () => {
  counter.updateText(text.value)
  stats.characters = counter.stats.characters
  stats.words = counter.stats.words
  stats.lines = counter.stats.lines
}

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(text.value)
    showToast(t('copied'), 'success')
  } catch (error) {
    showToast(t('error'), 'error')
  }
}

const exportStats = () => {
  try {
    const data = {
      text: text.value,
      stats: { ...stats },
      timestamp: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'text-stats.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showToast(t('exportSuccess'), 'success')
  } catch (error) {
    showToast(t('error'), 'error')
  }
}

// Register keyboard shortcuts
onMounted(() => {
  registerShortcut({
    key: 'c',
    ctrl: true,
    action: copyText,
    description: 'shortcuts.copy'
  })

  registerShortcut({
    key: 'e',
    ctrl: true,
    action: exportStats,
    description: 'shortcuts.export'
  })

  registerShortcut({
    key: 'Delete',
    ctrl: true,
    action: clearText,
    description: 'shortcuts.clear'
  })

  registerShortcut({
    key: '?',
    action: toggleShortcuts,
    description: 'shortcuts.help'
  })
})

onUnmounted(() => {
  clearTimeout(debounceTimeout)
})
</script>
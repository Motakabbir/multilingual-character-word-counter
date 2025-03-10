<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
             hover:bg-gray-50 dark:hover:bg-gray-700
             focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
             transition-all duration-200 flex items-center space-x-2"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
    >
      <GlobeAltIcon class="h-5 w-5 text-primary" />
      <span>{{ currentLocale.name }}</span>
      <ChevronDownIcon 
        class="h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-800 
               shadow-lg ring-1 ring-black ring-opacity-5 z-50
               divide-y divide-gray-100 dark:divide-gray-700"
      >
        <div class="py-1" role="listbox">
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            class="w-full text-left px-4 py-2 text-sm flex items-center justify-between
                   hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            :class="[
              locale === loc.code
                ? 'text-primary font-medium'
                : 'text-gray-700 dark:text-gray-300'
            ]"
            role="option"
            :aria-selected="locale === loc.code"
            @click="selectLocale(loc.code)"
          >
            {{ loc.name }}
           
            <CheckIcon 
              v-if="locale === loc.code"
              class="h-4 w-4 text-primary animate-scale-in" 
            />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { GlobeAltIcon, ChevronDownIcon, CheckIcon } from '@heroicons/vue/24/outline'
import type { LocaleObject } from '@nuxtjs/i18n'

const { locale, locales, setLocale  } = useI18n()
const counter = useCounterStore()
const isOpen = ref(false)

const availableLocales = computed(() =>
  locales.value.map(loc => ({ 
    code: loc.code, 
    name: loc.name 
  }))
)

const currentLocale = computed(() => 
  availableLocales.value.find(loc => loc.code === locale.value) || availableLocales.value[0]
)

const selectLocale = async (code: string) => {
  await setLocale(code);
  //locale.value = code;
  counter.setLanguage(code)
  isOpen.value = false
  
  if (process.client) {
    localStorage.setItem('preferredLocale', code)
  }
}

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (isOpen.value && !event.composedPath().includes(event.currentTarget as HTMLElement)) {
      isOpen.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  
  // Load preferred locale
  if (process.client) {
    const preferred = localStorage.getItem('preferredLocale')
    if (preferred && locales.value.find(loc => loc.code === preferred)) {
      locale.value = preferred;
    }
  }
})
</script>
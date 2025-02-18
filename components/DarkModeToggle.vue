<template>
    <button
      @click="toggleDarkMode"
      class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 
             dark:hover:bg-gray-600 transition-colors duration-200"
    >
      <span class="sr-only">{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
      <svg
        v-if="isDark"
        class="w-6 h-6 text-yellow-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
        />
      </svg>
      <svg
        v-else
        class="w-6 h-6 text-gray-900"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  </template>
  
  <script setup lang="ts">
  const isDark = useDarkMode()
  const toggleDarkMode = () => isDark.value = !isDark.value
  </script>
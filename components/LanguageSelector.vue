<template>
  <select v-model="locale" class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
             bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
    <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code">
      {{ locale }}
    </option>
  </select>
</template>

<script setup lang="ts">
  const { locale, availableLocales } = useI18n()
  const counter = useCounterStore()

  watch(locale, (newLocale) => {
    counter.setLanguage(newLocale)
  })
</script>
<template>
  <select v-model="locale" class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
           bg-white dark:bg-gray-800 text-gray-900 dark:text-white" @change="changeLocale">
    <option v-for="loc in availableLocales" :key="loc.code" :value="loc.code">
      {{ loc.name }}
    </option>

  </select>
</template>

<script setup lang="ts">
  const { locale, locales, setLocale } = useI18n()
  const counter = useCounterStore()

  const availableLocales = computed(() =>
    locales.value.map(loc => ({ code: loc.code, name: loc.name }))
  )

  const changeLocale = () => {
    setLocale(locale.value) // Ensure locale updates correctly
  }

  watch(locale, (newLocale) => {
    counter.setLanguage(newLocale)
  })
</script>
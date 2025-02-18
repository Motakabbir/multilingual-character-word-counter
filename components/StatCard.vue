<template>
  <div class="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <div class="text-primary dark:text-primary-light">
        <slot name="icon"></slot>
      </div>
    </div>
    <p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
      {{ value }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: number
}>()
</script>
<template>
  <TransitionGroup
    tag="div"
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-2 opacity-0"
    class="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg max-w-sm"
      :class="[
        toast.type === 'success' 
          ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
          : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
      ]"
    >
      <CheckCircleIcon 
        v-if="toast.type === 'success'"
        class="h-5 w-5 text-green-500 dark:text-green-400"
      />
      <ExclamationCircleIcon
        v-else
        class="h-5 w-5 text-red-500 dark:text-red-400"
      />
      <p>{{ toast.message }}</p>
      <button
        @click="() => removeToast(toast.id)"
        class="ml-auto p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5"
      >
        <XMarkIcon class="h-4 w-4" />
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error'
}

const toasts = ref<Toast[]>([])
let nextId = 0

const addToast = (message: string, type: 'success' | 'error' = 'success') => {
  const id = nextId++
  toasts.value.push({ id, message, type })
  setTimeout(() => removeToast(id), 3000)
}

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

defineExpose({
  add: addToast
})
</script>
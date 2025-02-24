<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <button
      v-show="showButton"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 p-3 rounded-full bg-primary dark:bg-primary 
             shadow-lg hover:shadow-xl active:shadow-md
             text-white hover:bg-primary/90 active:bg-primary/80
             transform hover:-translate-y-1 active:translate-y-0
             transition-all duration-200 z-40 group focus:outline-none 
             focus:ring-2 focus:ring-primary focus:ring-offset-2 
             dark:focus:ring-offset-gray-800"
      :aria-label="t('scrollToTop')"
    >
      <ArrowUpIcon class="h-6 w-6 transition-transform group-hover:scale-110" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ArrowUpIcon } from '@heroicons/vue/24/outline'
const { t } = useI18n()
const showButton = ref(false)

const checkScroll = () => {
  showButton.value = window.scrollY > 200
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll)
  })
})
</script>
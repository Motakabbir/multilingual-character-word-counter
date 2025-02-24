<template>
  <div>
    <button 
      @click="toggleMenu"
      class="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
             dark:hover:bg-gray-600 transition-all duration-200"
      :aria-label="t('nav.toggleMenu')"
    >
      <Bars3Icon v-if="!isMenuOpen" class="h-6 w-6 text-gray-600 dark:text-gray-300" />
      <XMarkIcon v-else class="h-6 w-6 text-gray-600 dark:text-gray-300" />
    </button>

    <!-- Mobile Menu Overlay with Blur -->
    <Transition name="fade">
      <div 
        v-if="isMenuOpen"
        class="fixed inset-0 z-40 bg-gray-800/50 dark:bg-black/50 backdrop-blur-sm"
        @click="closeMenu"
      ></div>
    </Transition>

    <!-- Mobile Menu Panel -->
    <Transition name="slide">
      <div
        v-if="isMenuOpen"
        class="fixed right-0 top-0 z-50 h-full w-72 bg-white dark:bg-gray-800 shadow-lg"
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-primary">
              {{ t('nav.menu') }}
            </h2>
            <button 
              @click="closeMenu"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :aria-label="t('nav.closeMenu')"
            >
              <XMarkIcon class="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <nav>
            <ul class="space-y-2">
              <li v-for="item in items" :key="item.path">
                <NuxtLink
                  :to="item.path"
                  class="flex items-center space-x-3 p-3 rounded-xl transition-all duration-200"
                  :class="[
                    route.path === item.path 
                      ? 'bg-primary/10 text-primary dark:text-primary font-medium' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  ]"
                  @click="closeMenu"
                >
                  <component :is="item.icon" 
                           class="h-5 w-5"
                           :class="route.path === item.path ? 'text-primary' : ''" />
                  <span>{{ t(item.label) }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const isMenuOpen = ref(false)

const props = defineProps<{
  items: Array<{ 
    path: string
    label: string
    icon: Component 
  }>
}>()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

// Close menu when route changes
watch(() => route.path, closeMenu)

// Close menu on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMenuOpen.value) {
      closeMenu()
    }
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
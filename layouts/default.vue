<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <Header />
    <Breadcrumbs />
    <main class="flex-grow">
      <NuxtPage class="page-transition" />
    </main>
    <Footer />
    <Toast ref="toastRef" />
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

const { setToastRef } = useToast()
const toastRef = ref(null)

onMounted(() => {
  setToastRef(toastRef.value)
})
</script>

<style>
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

::selection {
  @apply bg-primary/20 dark:bg-primary/30;
}
</style>
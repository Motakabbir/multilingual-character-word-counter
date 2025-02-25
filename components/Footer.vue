<template>
  <footer class="bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-primary py-6">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div class="text-white text-center md:text-left">
          <p>&copy; {{ new Date().getFullYear() }} Your Company. All rights reserved.</p>
        </div>
        <div class="flex space-x-4">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" class="text-white hover:text-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" class="text-white hover:text-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 19c11 0 17-9 17-17 0-.26 0-.52-.02-.78A12.14 12.14 0 0028 2.5a11.93 11.93 0 01-3.44.94A6.02 6.02 0 0027.3.4a12.07 12.07 0 01-3.82 1.46A6.01 6.01 0 0019.5 0c-3.32 0-6 2.68-6 6 0 .47.05.93.15 1.37A17.06 17.06 0 012.1 1.1a6.01 6.01 0 001.86 8.02A5.96 5.96 0 011.2 8.6v.08c0 2.8 1.99 5.13 4.63 5.66a6.01 6.01 0 01-2.7.1 6.01 6.01 0 005.6 4.16A12.07 12.07 0 010 21.54a17.06 17.06 0 009.29 2.72" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No script needed for this footer
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
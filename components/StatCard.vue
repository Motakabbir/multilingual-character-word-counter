<template>
  <div :class="['p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300', cardColor]">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <div :class="['p-2 rounded-lg', iconBgColor]">
        <DocumentTextIcon v-if="icon === 'char'" class="h-6 w-6" :class="iconColor" />
        <ChatBubbleBottomCenterTextIcon v-else-if="icon === 'word'" class="h-6 w-6" :class="iconColor" />
        <ListBulletIcon v-else-if="icon === 'line'" class="h-6 w-6" :class="iconColor" />
        <DocumentTextIcon v-else-if="icon === 'para'" class="h-6 w-6" :class="iconColor" />
      </div>
    </div>
    <p class="mt-4 text-3xl font-bold" :class="valueColor">
      {{ animatedValue.current }}
      <span v-if="animatedValue.animating" class="text-sm ml-1 opacity-50">
        <ArrowUpIcon v-if="value > previousValue" class="h-4 w-4 inline animate-bounce-small text-green-500" />
        <ArrowDownIcon v-else-if="value < previousValue" class="h-4 w-4 inline animate-bounce-small text-red-500" />
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { 
  DocumentTextIcon, 
  ChatBubbleBottomCenterTextIcon, 
  ListBulletIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  title: string
  value: number
  icon: 'char' | 'word' | 'line' | 'para'
}>()

const previousValue = ref(props.value)
const animatedValue = useNumberAnimation(props.value)

watch(() => props.value, (newValue, oldValue) => {
  previousValue.value = oldValue
  animatedValue.animateToValue(newValue)
})

const cardColor = computed(() => ({
  'bg-blue-50 dark:bg-blue-900/20': props.icon === 'char',
  'bg-purple-50 dark:bg-purple-900/20': props.icon === 'word',
  'bg-emerald-50 dark:bg-emerald-900/20': props.icon === 'line',
  'bg-amber-50 dark:bg-amber-900/20': props.icon === 'para'
}))

const iconBgColor = computed(() => ({
  'bg-blue-100 dark:bg-blue-900/40': props.icon === 'char',
  'bg-purple-100 dark:bg-purple-900/40': props.icon === 'word',
  'bg-emerald-100 dark:bg-emerald-900/40': props.icon === 'line',
  'bg-amber-100 dark:bg-amber-900/40': props.icon === 'para'
}))

const iconColor = computed(() => ({
  'text-blue-600 dark:text-blue-400': props.icon === 'char',
  'text-purple-600 dark:text-purple-400': props.icon === 'word',
  'text-emerald-600 dark:text-emerald-400': props.icon === 'line',
  'text-amber-600 dark:text-amber-400': props.icon === 'para'
}))

const valueColor = computed(() => ({
  'text-blue-700 dark:text-blue-300': props.icon === 'char',
  'text-purple-700 dark:text-purple-300': props.icon === 'word',
  'text-emerald-700 dark:text-emerald-300': props.icon === 'line',
  'text-amber-700 dark:text-amber-300': props.icon === 'para'
}))
</script>
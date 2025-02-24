export const useNumberAnimation = (startValue: number) => {
  const current = ref(startValue)
  const target = ref(startValue)
  const animating = ref(false)

  const animateToValue = (newValue: number, duration: number = 500) => {
    target.value = newValue
    animating.value = true

    const startTime = Date.now()
    const startValue = current.value
    const endValue = newValue
    const change = endValue - startValue

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(1, elapsed / duration)
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      current.value = Math.round(startValue + (change * easeOutQuart))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        current.value = endValue
        animating.value = false
      }
    }

    requestAnimationFrame(animate)
  }

  return {
    current,
    animating,
    animateToValue
  }
}
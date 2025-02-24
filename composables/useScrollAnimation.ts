export const useScrollAnimation = () => {
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      }
    })
  }

  onMounted(() => {
    if (process.client) {
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      })

      document.querySelectorAll('.fade-in-section').forEach(element => {
        element.classList.add('opacity-0', 'translate-y-4')
        observer.observe(element)
      })
    }
  })
}
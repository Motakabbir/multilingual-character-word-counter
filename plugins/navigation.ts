export default defineNuxtPlugin(() => {
  const router = useRouter()
  const { registerShortcut } = useKeyboardShortcuts()

  onMounted(() => {
    // Alt + H -> Home
    registerShortcut({
      key: 'h',
      alt: true,
      action: () => router.push('/'),
      description: 'shortcuts.nav.home'
    })

    // Alt + A -> About
    registerShortcut({
      key: 'a',
      alt: true,
      action: () => router.push('/about'),
      description: 'shortcuts.nav.about'
    })

    // Alt + T -> Terms
    registerShortcut({
      key: 't',
      alt: true,
      action: () => router.push('/terms'),
      description: 'shortcuts.nav.terms'
    })

    // Alt + P -> Privacy
    registerShortcut({
      key: 'p',
      alt: true,
      action: () => router.push('/privacy'),
      description: 'shortcuts.nav.privacy'
    })
  })
})
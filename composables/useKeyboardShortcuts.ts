interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  action: () => void
  description: string
}

export const useKeyboardShortcuts = () => {
  const shortcuts = ref<KeyboardShortcut[]>([])

  const registerShortcut = (shortcut: KeyboardShortcut) => {
    shortcuts.value.push(shortcut)
  }

  onMounted(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      shortcuts.value.forEach(shortcut => {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase()
        const ctrlMatch = !shortcut.ctrl || (shortcut.ctrl && (event.ctrlKey || event.metaKey))
        const altMatch = !shortcut.alt || (shortcut.alt && event.altKey)
        const shiftMatch = !shortcut.shift || (shortcut.shift && event.shiftKey)

        if (keyMatch && ctrlMatch && altMatch && shiftMatch) {
          event.preventDefault()
          shortcut.action()
        }
      })
    }

    window.addEventListener('keydown', handleKeydown)
    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeydown)
    })
  })

  return {
    registerShortcut,
    shortcuts
  }
}
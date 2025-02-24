interface ToastRef {
  add: (message: string, type?: 'success' | 'error') => void
}

const toastRef = ref<ToastRef | null>(null)

export const useToast = () => {
  const setToastRef = (ref: ToastRef) => {
    toastRef.value = ref
  }

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    toastRef.value?.add(message, type)
  }

  return {
    setToastRef,
    showToast
  }
}
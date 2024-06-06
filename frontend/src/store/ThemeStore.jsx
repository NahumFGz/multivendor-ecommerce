/* eslint-disable no-undef */
import { create } from 'zustand'
import { useEffect } from 'react'
import { persist, createJSONStorage } from 'zustand/middleware'

const useThemeStore = create(
  persist((set) => ({
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
    toggleTheme: () => set((state) => (
      { theme: state.theme === 'light' ? 'dark' : 'light' }
    ))
  }), {
    name: 'theme-storage',
    storage: createJSONStorage(() => localStorage)
  }))

export function useSwapTheme () {
  const theme = useThemeStore(state => state.theme)
  const toggleTheme = useThemeStore(state => state.toggleTheme)

  useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (theme === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  }, [theme])

  return { handleSwapTheme: toggleTheme }
}

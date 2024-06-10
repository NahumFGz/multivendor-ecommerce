import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAuth: false,
      profile: null,
      setToken: (token) => {
        set({ token, isAuth: true })
        // console.log('token', token)
        // console.log('isAuth', true)
      },
      setProfile: (profile) => set({ profile }),
      cleanStore: () => {
        set({ token: null, isAuth: false, profile: null })
        console.log('cleanStore')
      }
    }),
    {
      name: 'user-storage'
    }
  )
)

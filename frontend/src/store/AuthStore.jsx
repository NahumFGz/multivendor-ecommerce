/* eslint-disable no-undef */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// true para localStorage, false para sessionStorage
const chooseStorage = (typeStorage) =>
  createJSONStorage(() => (typeStorage ? localStorage : sessionStorage))

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAuth: false,
      profile: null,
      typeStorage: true,
      setToken: (token) => {
        set({ token, isAuth: true })
        console.log('token', token)
        console.log('isAuth', true)
      },
      setProfile: (profile) => set({ profile }),
      cleanStore: () => {
        set({ token: null, isAuth: false, profile: null })
        console.log('cleanStore')
      },
      setTypeStorage: (newTypeStorage) => set({ typeStorage: newTypeStorage })
    }),
    {
      name: 'user-storage',
      storage: () => chooseStorage(useAuthStore.getState().typeStorage)
    }
  )
)

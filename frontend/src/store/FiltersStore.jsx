/* eslint-disable no-undef */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useInfoAPI } from '../features/Home/hooks/useInfoAPI'

const useFiltersStore = create(
  persist((set) => ({
    filters: [],
    setFilters: (filters) => set({ filters }),
    initializeFilters: async () => {
      try {
        const { getAllFilters } = useInfoAPI()
        const { allFiltersInfo } = await getAllFilters()

        set({ filters: allFiltersInfo })
      } catch (error) {
        console.error('Get all filters failed', error)
      }
    }
  }), {
    name: 'filters-storage',
    storage: createJSONStorage(() => sessionStorage)
  })
)

export function useFilters () {
  const filters = useFiltersStore(state => state.filters)
  const initializeFilters = useFiltersStore(state => state.initializeFilters)

  return { filters, initializeFilters }
}

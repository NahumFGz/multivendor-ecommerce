/* eslint-disable no-undef */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useInfoAPI, getCategories, getSubCategoryByCategoryId } from '../features/Home/hooks/useInfoAPI'

const useFiltersStore = create(
  persist((set) => ({
    filters: [],
    categories: [],
    subCategories: [],
    setFilters: (filters) => set({ filters }),
    setCategories: (categories) => set({ categories }),
    setSubCategories: (subCategories) => set({ subCategories }),
    initializeFilters: async () => {
      try {
        const { getAllFilters } = useInfoAPI()
        const { allFiltersInfo } = await getAllFilters()

        set({ filters: allFiltersInfo })

        const categoriesInfo = getCategories(allFiltersInfo)
        set({ categories: categoriesInfo })

        const subCategoriesInfo = getSubCategoryByCategoryId(allFiltersInfo, [])
        set({ subCategories: subCategoriesInfo })
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
  const setFilters = useFiltersStore(state => state.setFilters)
  const categories = useFiltersStore(state => state.categories)
  const setCategories = useFiltersStore(state => state.setCategories)
  const subCategories = useFiltersStore(state => state.subCategories)
  const setSubCategories = useFiltersStore(state => state.setSubCategories)
  const initializeFilters = useFiltersStore(state => state.initializeFilters)

  return { filters, setFilters, categories, setCategories, subCategories, setSubCategories, initializeFilters }
}

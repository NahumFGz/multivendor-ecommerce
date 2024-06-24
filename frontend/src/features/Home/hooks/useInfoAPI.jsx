import { getAllFiltersApi } from '../../../services/api/infoAPI'

export function useInfoAPI () {
  const getAllFilters = async () => {
    try {
      const response = await getAllFiltersApi()
      return response
    } catch (error) {
      throw new Error('Get all filters failed')
    }
  }

  return { getAllFilters }
}

export const getCategories = (data) => {
  const categoriesMap = new Map()

  data.forEach(item => {
    if (!categoriesMap.has(item.categoryId)) {
      categoriesMap.set(item.categoryId, {
        id: parseInt(item.categoryId, 10),
        categoryId: item.categoryId,
        categoryName: item.categoryName
      })
    }
  })

  return Array.from(categoriesMap.values())
}

export const getKindsByCategoryId = (data, categoryIds) => {
  const filteredData = Array.isArray(categoryIds) && categoryIds.length > 0 ? data.filter(item => categoryIds.includes(item.categoryId)) : data

  const kinds = []

  filteredData.forEach(item => {
    if (!kinds.some(kind => kind.kindId === item.kindId)) {
      kinds.push({
        id: parseInt(item.kindId, 10),
        kindId: item.kindId,
        kindName: item.kindName
      })
    }
  })

  return { kinds }
}

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
  let categoryIdCounter = 0

  data.forEach(item => {
    if (!categoriesMap.has(item.categoryId)) {
      categoriesMap.set(item.categoryId, {
        id: categoryIdCounter++,
        categoryId: item.categoryId,
        categoryName: item.categoryName
      })
    }
  })

  return Array.from(categoriesMap.values())
}

export const getKindsAndSubkindsByCategoryId = (data, categoryIds) => {
  const filteredData = Array.isArray(categoryIds) && categoryIds.length > 0 ? data.filter(item => categoryIds.includes(item.categoryId)) : data

  const kinds = []
  const subkinds = []
  let kindIdCounter = 0
  let subkindIdCounter = 0

  filteredData.forEach(item => {
    if (!kinds.some(kind => kind.kindId === item.kindId)) {
      kinds.push({
        id: kindIdCounter++,
        kindId: item.kindId,
        kindName: item.kindName
      })
    }

    subkinds.push({
      id: subkindIdCounter++,
      subKindName: item.subKindName,
      subKindId: item.subKindId
    })
  })

  return { kinds, subkinds }
}

export const getSubkindsByKindId = (data, kindIds) => {
  const filteredData = Array.isArray(kindIds) && kindIds.length > 0 ? data.filter(item => kindIds.includes(item.kindId)) : data

  const subkinds = []
  let subkindIdCounter = 0

  filteredData.forEach(item => {
    subkinds.push({
      id: subkindIdCounter++,
      subKindName: item.subKindName,
      subKindId: item.subKindId
    })
  })

  return subkinds
}

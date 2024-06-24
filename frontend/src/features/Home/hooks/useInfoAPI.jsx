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

export const getKindsAndSubkindsByCategoryId = (data, categoryId) => {
  const filteredData = categoryId ? data.filter(item => item.categoryId === categoryId) : data

  const kinds = []
  const subkindsMap = new Map()
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

    if (!subkindsMap.has(item.subKindName)) {
      subkindsMap.set(item.subKindName, [])
    }
    subkindsMap.get(item.subKindName).push(item.subKindId)
  })

  const subkinds = Array.from(subkindsMap, ([subKindName, subKindIds]) => ({
    id: subkindIdCounter++,
    subKindName,
    subKindIds: subKindIds.join(',')
  }))

  return { kinds, subkinds }
}

export const getSubkindsByKindId = (data, kindId) => {
  const filteredData = kindId ? data.filter(item => item.kindId === kindId) : data

  const subkindsMap = new Map()
  let subkindIdCounter = 0

  filteredData.forEach(item => {
    if (!subkindsMap.has(item.subKindName)) {
      subkindsMap.set(item.subKindName, [])
    }
    subkindsMap.get(item.subKindName).push(item.subKindId)
  })

  const subkinds = Array.from(subkindsMap, ([subKindName, subKindIds]) => ({
    id: subkindIdCounter++,
    subKindName,
    subKindIds: subKindIds.join(',')
  }))

  return subkinds
}

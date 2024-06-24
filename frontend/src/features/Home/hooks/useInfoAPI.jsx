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
        categoryId: item.categoryId,
        categoryName: item.categoryName
      })
    }
  })

  return Array.from(categoriesMap.values())
}

export const getKindsAndSubkindsByCategoryId = (data, categoryId) => {
  const filteredData = data.filter(item => item.categoryId === categoryId)

  const kinds = []
  const subkindsMap = new Map()

  filteredData.forEach(item => {
    if (!kinds.some(kind => kind.kindId === item.kindId)) {
      kinds.push({
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
    subKindName,
    subKindIds: subKindIds.join(',')
  }))

  return { kinds, subkinds }
}

export const getSubkindsByKindId = (data, kindId) => {
  const filteredData = data.filter(item => item.kindId === kindId)

  const subkindsMap = new Map()

  filteredData.forEach(item => {
    if (!subkindsMap.has(item.subKindName)) {
      subkindsMap.set(item.subKindName, [])
    }
    subkindsMap.get(item.subKindName).push(item.subKindId)
  })

  const subkinds = Array.from(subkindsMap, ([subKindName, subKindIds]) => ({
    subKindName,
    subKindIds: subKindIds.join(',')
  }))

  return subkinds
}

/*
! Ejemplo de uso de getCategories
const categories = getCategories(data);
console.log('Categories:', categories);
[
  { categoryId: "3", categoryName: "Pokemon" },
  { categoryId: "2", categoryName: "YuGiOh" },
  { categoryId: "1", categoryName: "Juegos de Mesa" }
]

! Ejemplo de uso de getKindsAndSubkinds
const categoryId = "3";
const { kinds, subkinds } = getKindsAndSubkinds(data, categoryId);
console.log('Kinds:', kinds);
console.log('Subkinds:', subkinds);

[
  { kindId: "1", kindName: "Shrouded Fable" },
  { kindId: "2", kindName: "Twilight Masquerade" },
  { kindId: "4", kindName: "Paldean Fates" }
]

[
  { subKindName: "single", subKindIds: "1,5,7" },
  { subKindName: "thin", subKindIds: "2" },
  { subKindName: "sellado", subKindIds: "3,4,6" }
]

! Ejemplo de uso de getSubkindsByKindId
const kindId = "1";
const subkinds = getSubkindsByKindId(data, kindId);
console.log('Subkinds:', subkinds);

[
  { subKindName: "single", subKindIds: "1" },
  { subKindName: "thin", subKindIds: "2" },
  { subKindName: "sellado", subKindIds: "3" }
]
*/

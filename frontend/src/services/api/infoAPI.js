import { createAxiosInstance } from './axiosInstance'

export async function getAllFiltersApi () {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.get('/api/info/sub-categories/')
    const { data, status } = response

    if (status === 200) {
      const allFiltersInfo = data.map(info => ({
        categoryId: (info.category_id || 0).toString(),
        categoryName: info.category_name || '',
        subCategoryId: (info.sub_category_id || 0).toString(),
        subCategoryName: info.sub_category_name || ''
      }))

      console.log('allFiltersInfo', allFiltersInfo)

      return {
        allFiltersInfo
      }
    } else {
      throw new Error('Get products failed')
    }
  } catch (error) {
    throw new Error('Get products failed')
  }
}

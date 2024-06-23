import { createAxiosInstance } from './axiosInstance'

export async function getAllFiltersApi () {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.get('/api/info/all-filters/')
    const { data, status } = response

    if (status === 200) {
      const allFiltersInfo = data.map(info => ({
        categoryId: (info.category_id || 0).toString(),
        categoryName: info.category_name || '',
        kindId: (info.kind_id || 0).toString(),
        kindName: info.kind_name || '',
        subKindId: (info.subkind_id || 0).toString(),
        subKindName: info.subkind_name || ''
      }))

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

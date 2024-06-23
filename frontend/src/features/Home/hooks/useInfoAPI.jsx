import { getAllFiltersApi } from '../../../services/api/infoAPI'

export function useInfoAPI () {
  const getAllFilters = async () => {
    try {
      const response = await getAllFiltersApi()
      console.log(response)
      return response
    } catch (error) {
      throw new Error('Get all filters failed')
    }
  }

  return { getAllFilters }
}

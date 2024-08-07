import { getProductDetailApi, getProductsApi } from '../../../services/api/productsAPI'

export function useProductsAPI () {
  const getProducts = async (page = 1, pageSize = 12, ordering = '', categories = [], subCategories = [], searchQuery = '', vendorType = 1) => {
    try {
      const response = await getProductsApi(page, pageSize, ordering, categories, subCategories, searchQuery, vendorType)
      return response
    } catch (error) {
      throw new Error('Get products failed')
    }
  }

  const getProductDetail = async (slugProduct) => {
    try {
      const product = await getProductDetailApi(slugProduct)
      return product
    } catch (error) {
      throw new Error('Get product detail failed')
    }
  }

  return { getProducts, getProductDetail }
}

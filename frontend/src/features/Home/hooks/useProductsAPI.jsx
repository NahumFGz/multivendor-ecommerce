import { getProductDetailApi, getProductsApi } from '../../../services/api/productsAPI'

export function useProductsAPI () {
  const getProducts = async () => {
    try {
      const response = await getProductsApi()
      return response
    } catch (error) {
      throw new Error('Get products failed')
    }
  }

  const getProductDetail = async (slugProduct) => {
    try {
      const response = await getProductDetailApi(slugProduct)
      return response
    } catch (error) {
      throw new Error('Get product detail failed')
    }
  }

  return { getProducts, getProductDetail }
}

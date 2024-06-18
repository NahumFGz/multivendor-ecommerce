import { createAxiosInstance } from './axiosInstance'

export async function getProductsApi () {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.get('/api/products/')
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Get products failed')
    }
  } catch (error) {
    throw new Error('Get products failed')
  }
}

export async function getProductDetailApi (slugProduct) {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.patch(`/api/products/${slugProduct}/`)
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Get product detail failed')
    }
  } catch (error) {
    throw new Error('Get product detail failed')
  }
}

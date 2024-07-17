import { createAxiosInstance } from './axiosInstance'

export async function getProductsVendorApi () {
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

import { createAxiosAuthInstance } from './axiosInstance'

export async function logoutAllApi (accessToken) {
  try {
    const axiosInstance = createAxiosAuthInstance(accessToken)
    const response = await axiosInstance.post('/api/account/logout-all/')
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Logout all failed')
    }
  } catch (error) {
    throw new Error('Logout all failed')
  }
}

export async function changePasswordApi (accessToken, changePasswordData) {
  try {
    const axiosInstance = createAxiosAuthInstance(accessToken)
    const response = await axiosInstance.post('/api/account/change-password/', changePasswordData)
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Change password failed')
    }
  } catch (error) {
    throw new Error('Change password failed')
  }
}

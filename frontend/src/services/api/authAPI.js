import { createAxiosInstance, createAxiosAuthInstance } from './axiosInstance'

export async function loginAccessApi (email, password) {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.post('/api/auth/login-access/', { email, password })
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Login failed')
    }
  } catch (error) {
    throw new Error('Login failed')
  }
}

export async function loginRefreshApi (refreshToken) {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.post('/api/auth/login-refresh/', { refresh: refreshToken })
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Refresh token failed')
    }
  } catch (error) {
    throw new Error('Refresh token failed')
  }
}

export async function registerApi (registerFormData) {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.post('/api/auth/register/', registerFormData)
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data
    }
    throw new Error('No se pudo conectar con la API')
  }
}

export async function authMeApi (accessToken) {
  try {
    const axiosInstance = createAxiosAuthInstance(accessToken)
    const response = await axiosInstance.get('/api/auth/me/')
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('AuthMe failed')
    }
  } catch (error) {
    throw new Error('AuthMe failed')
  }
}

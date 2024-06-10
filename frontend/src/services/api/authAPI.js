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

export async function logoutAllApi (accessToken) {
  try {
    const axiosInstance = createAxiosAuthInstance(accessToken)
    const response = await axiosInstance.post('/api/auth/logout-all/')
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

export async function resetPasswordApi (email) {
  try {
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.post('/api/auth/password-reset/', { email })
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Reset password failed')
    }
  } catch (error) {
    throw new Error('Reset password failed')
  }
}

export async function resetPasswordConfirmApi (resetPasswordConfirmData) {
  try {
    const { uidb64, token } = resetPasswordConfirmData
    const axiosInstance = createAxiosInstance()
    const response = await axiosInstance.post(`/api/auth/password-reset-confirm/${uidb64}/${token}/`, resetPasswordConfirmData)
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Reset password confirm failed')
    }
  } catch (error) {
    throw new Error('Reset password confirm failed')
  }
}

export async function changePasswordApi (accessToken, changePasswordData) {
  try {
    const axiosInstance = createAxiosAuthInstance(accessToken)
    const response = await axiosInstance.post('/api/auth/password-change/', changePasswordData)
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

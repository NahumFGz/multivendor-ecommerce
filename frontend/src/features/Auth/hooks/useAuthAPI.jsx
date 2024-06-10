import { loginAccessApi, authMeApi, resetPasswordApi, registerApi, resetPasswordConfirmApi } from '../../../services/api/authAPI'
import { useAuthStore } from '../../../store/AuthStore'

export function useAuthAPI () {
  const token = useAuthStore((state) => state.token)
  const setTypeStorage = useAuthStore((state) => state.setTypeStorage)

  const loginAccess = async (email, password, typeStorage) => {
    try {
      setTypeStorage(typeStorage)
      const response = await loginAccessApi(email, password)
      return response
    } catch (error) {
      throw new Error('Login failed')
    }
  }

  const authMe = async () => {
    try {
      const response = await authMeApi(token?.access)
      return response
    } catch (error) {
      throw new Error('Error getting profile')
    }
  }

  const resetPassword = async (email) => {
    try {
      const response = await resetPasswordApi(email)
      return response
    } catch (error) {
      throw new Error('Error sending email')
    }
  }

  const registerUser = async (values) => {
    try {
      const response = await registerApi(values)
      return response
    } catch (error) {
      throw new Error('Error registering user')
    }
  }

  const resetPasswordConfirm = async (values) => {
    try {
      const response = await resetPasswordConfirmApi(values)
      return response
    } catch (error) {
      throw new Error('Error resetting password')
    }
  }

  return { loginAccess, authMe, resetPassword, registerUser, resetPasswordConfirm }
}

import { logoutAllApi, changePasswordApi } from '../../../services/api/accountAPI'
import { useAuthStore } from '../../../store/AuthStore'

export function useProductsAPI () {
  const token = useAuthStore((state) => state.token)
  //   const profile = useAuthStore((state) => state.profile)

  const logoutAllApiCall = async () => {
    try {
      await logoutAllApi(token)
    } catch (error) {
      throw new Error('Logout all failed')
    }
  }

  const changePasswordApiCall = async (changePasswordForm) => {
    try {
      await changePasswordApi(token, changePasswordForm)
    } catch (error) {
      throw new Error('Change password failed')
    }
  }

  return { logoutAllApiCall, changePasswordApiCall }
}

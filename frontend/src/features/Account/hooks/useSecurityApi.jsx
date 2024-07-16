import { changePasswordApi, logoutAllApi } from '../../../services/api/account/securityAPI'
import { useAuthStore } from '../../../store/AuthStore'

export function useSecurityApi () {
  const token = useAuthStore((state) => state.token)
  //   const profile = useAuthStore((state) => state.profile)

  const changePasswordApiCall = async (changePasswordForm) => {
    try {
      const res = await changePasswordApi(token, changePasswordForm)
      return res
    } catch (error) {
      throw new Error('Change password failed')
    }
  }

  const logoutAllApiCall = async () => {
    try {
      await logoutAllApi(token)
    } catch (error) {
      throw new Error('Logout all sessions failed')
    }
  }

  return { logoutAllApiCall, changePasswordApiCall }
}

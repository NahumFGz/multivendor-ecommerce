import { useAuthStore } from '../../../store/AuthStore'
import { getAccountApi, patchAccountApi } from '../../../services/api/account/profileAPI'

export function useProfileAPI () {
  const token = useAuthStore((state) => state.token)
  const profile = useAuthStore((state) => state.profile)

  const getAccountApiCall = async () => {
    try {
      const res = await getAccountApi(token, profile.id)
      return res
    } catch (error) {
      throw new Error('Get account failed')
    }
  }

  const patchAccountApiCall = async (accountData) => {
    try {
      const res = await patchAccountApi(token, profile.id, accountData)
      return res
    } catch (error) {
      throw new Error('Patch account failed')
    }
  }

  return { getAccountApiCall, patchAccountApiCall }
}

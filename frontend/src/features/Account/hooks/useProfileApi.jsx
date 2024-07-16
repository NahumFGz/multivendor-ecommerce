import { useAuthStore } from '../../../store/AuthStore'
import { getAccountApi, patchAccountApi, updateProfileImageApi } from '../../../services/api/account/profileAPI'

export function useProfileApi () {
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

  const updateProfileImageApiCall = async (profileImage) => {
    try {
      const res = await updateProfileImageApi(token, profileImage)
      console.log('3res: ', res)
      return res
    } catch (error) {
      throw new Error('Update profile image failed')
    }
  }

  return { getAccountApiCall, patchAccountApiCall, updateProfileImageApiCall }
}

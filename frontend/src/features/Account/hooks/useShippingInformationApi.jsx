import { useAuthStore } from '../../../store/AuthStore'
import { getShippingInformationApi, patchShippingInformationApi } from '../../../services/api/account/shippingInformationAPI'

export function useShippingInformationApi () {
  const token = useAuthStore((state) => state.token)
  const profile = useAuthStore((state) => state.profile)

  const getShippingInformationApiCall = async () => {
    try {
      const res = await getShippingInformationApi(token, profile.id)
      return res
    } catch (error) {
      throw new Error('Get shipping information failed')
    }
  }

  const patchShippingInformationApiCall = async (shippingInformationData) => {
    try {
      const res = await patchShippingInformationApi(token, profile.id, shippingInformationData)
      return res
    } catch (error) {
      throw new Error('Patch shipping information failed')
    }
  }

  return { getShippingInformationApiCall, patchShippingInformationApiCall }
}

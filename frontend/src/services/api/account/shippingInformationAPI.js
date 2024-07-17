import { createAxiosAuthInstance } from '../axiosInstance'

export async function getShippingInformationApi (accessToken, id) {
  try {
    const axiosInstance = createAxiosAuthInstance(accessToken)
    const response = await axiosInstance.get(`/api/shipping-information/${id}/`)
    const { data, status } = response

    if (status === 200) {
      return {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        address: data.address,
        addressNumber: data.address_number,
        reference: data.reference,
        city: data.city,
        country: data.country,
        postalCode: data.postal_code,
        phoneCountryCode: data.phone_country_code,
        phoneNumber: data.phone_number
      }
    } else {
      throw new Error('Get shipping information failed')
    }
  } catch (error) {
    throw new Error('Get shipping information failed')
  }
}

export async function patchShippingInformationApi (accessToken, id, shippingInformationData) {
  try {
    const formatShippingInformationData = {
      first_name: shippingInformationData.firstName,
      last_name: shippingInformationData.lastName,
      address: shippingInformationData.address,
      address_number: shippingInformationData.addressNumber,
      reference: shippingInformationData.reference,
      city: shippingInformationData.city,
      country: shippingInformationData.country,
      postal_code: shippingInformationData.postalCode,
      phone_country_code: shippingInformationData.phoneCountryCode
    }

    const axiosInstance = createAxiosAuthInstance(accessToken)
    const response = await axiosInstance.patch(`/api/shipping-information/${id}/`, formatShippingInformationData)
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Patch shipping information failed')
    }
  } catch (error) {
    throw new Error('Patch shipping information failed')
  }
}

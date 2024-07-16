import { createAxiosAuthInstance } from '../axiosInstance'

export async function getAccountApi (accessToken, id) {
  try {
    const axiosInstance = createAxiosAuthInstance(accessToken)
    const response = await axiosInstance.get(`/api/account/${id}/`)
    const { data, status } = response

    if (status === 200) {
      return {
        id: data.id,
        birthDate: data.birth_date,
        documentType: data.document_type,
        documentNumber: data.document_number,
        firstName: data.first_name,
        lastName: data.last_name,
        gender: data.gender,
        country: data.country,
        phoneCountryCode: data.phone_country_code,
        phoneNumber: data.phone_number
      }
    } else {
      throw new Error('Get account failed')
    }
  } catch (error) {
    throw new Error('Get account failed')
  }
}

export async function patchAccountApi (accessToken, id, accountData) {
  try {
    const axiosInstance = createAxiosAuthInstance(accessToken)
    const response = await axiosInstance.patch(`/api/account/${id}/`, accountData)
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Patch account failed')
    }
  } catch (error) {
    throw new Error('Patch account failed')
  }
}

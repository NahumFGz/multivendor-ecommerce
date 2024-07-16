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
    const formatAccountData = {
      birth_date: accountData.birthDate,
      document_type: accountData.documentType,
      document_number: accountData.documentNumber,
      first_name: accountData.firstName,
      last_name: accountData.lastName,
      gender: accountData.gender,
      country: accountData.country,
      phone_country_code: accountData.phoneCountryCode,
      phone_number: accountData.phoneNumber
    }

    const axiosInstance = createAxiosAuthInstance(accessToken)
    const response = await axiosInstance.patch(`/api/account/${id}/`, formatAccountData)
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

export async function updateProfileImageApi (accessToken, id, profileImage) {
  try {
    const formData = new FormData()
    formData.append('profile_image', profileImage)

    const axiosInstance = createAxiosAuthInstance(accessToken)
    const response = await axiosInstance.patch(`/api/account/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const { data, status } = response

    if (status === 200) {
      return data
    } else {
      throw new Error('Update profile image failed')
    }
  } catch (error) {
    throw new Error('Update profile image failed')
  }
}

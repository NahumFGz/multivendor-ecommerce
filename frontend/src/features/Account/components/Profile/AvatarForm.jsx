import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { Button } from '@nextui-org/react'
import { useProfileApi } from '../../hooks/useProfileApi'
import { useAuthStore } from '../../../../store/AuthStore'
import { useAuthAPI } from '../../../Auth/hooks/useAuthAPI'

const BASE_URL = import.meta.env.VITE_BASE_API_URL

export function AvatarForm () {
  const { authMe } = useAuthAPI()
  const profile = useAuthStore((state) => state.profile)
  const setProfile = useAuthStore((state) => state.setProfile)

  const [avatarUrl, setAvatarUrl] = useState() // URL de la imagen de perfil actual
  const [isNewAvatarSelected, setIsNewAvatarSelected] = useState(false) // Estado para controlar si se ha seleccionado una nueva imagen
  const [selectedFile, setSelectedFile] = useState(null) // Estado para almacenar el archivo seleccionado
  const { updateProfileImageApiCall } = useProfileApi()

  useEffect(() => {
    if (profile) {
      setAvatarUrl(`${BASE_URL}${profile.profile_images.tiny}`)
    }
  }, [profile])

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new window.FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result)
        setIsNewAvatarSelected(true)
        setSelectedFile(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateAvatar = async () => {
    if (selectedFile) {
      try {
        // Actualiza la imagen de perfil
        await updateProfileImageApiCall(selectedFile)

        // Actualiza los datos del perfil
        const responseMe = await authMe()
        setProfile(responseMe)

        toast.success('Avatar updated successfully')
      } catch (error) {
        console.log('Error updating avatar:', error)
        toast.error('Error updating avatar')
      }
    } else {
      toast.error('Please select an image to upload')
    }
  }

  return (
    <form className='mt-8'>
      <div className='space-y-12'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 border-b border-default-900/10 pb-4 md:grid-cols-3'>
          <div>
            <h2 className='text-base font-semibold leading-7 text-default-900'>Change Avatar</h2>
            <p className='mt-1 text-sm leading-6 text-default-500'>Upload a new avatar to change your avatar.</p>
          </div>
          <div className='flex items-center max-w-2xl gap-x-6 gap-y-8 md:col-span-2'>
            <img
              src={avatarUrl}
              alt='Current Avatar'
              className='h-24 w-24 rounded-full border'
            />
            <div className='flex flex-row gap-4'>
              <input
                id='avatarInput'
                type='file'
                accept='image/*'
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <label htmlFor='avatarInput'>
                <Button
                  size='sm'
                  startContent={
                    <Icon className='text-default-500' icon='solar:paperclip-linear' width={18} />
                  }
                  variant='flat'
                  as='span'
                  className='mb-2'
                >
                  Attach
                </Button>
              </label>
              <Button
                onPress={handleUpdateAvatar}
                color='primary'
                size='sm'
                isDisabled={!isNewAvatarSelected}
              >
                Update Avatar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

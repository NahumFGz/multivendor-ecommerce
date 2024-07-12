import { useState } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { Button } from '@nextui-org/react'

export function AvatarForm () {
  const defaultAvatarUrl = 'http://localhost:8000/media/thumbnails/account/profile_image/bippPiLLAcesbKtDrbtduF_tiny.jpg'
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatarUrl) // URL de la imagen de perfil actual

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new window.FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateAvatar = () => {
    if (avatarUrl !== defaultAvatarUrl) {
      toast.success('Avatar updated successfully')
    } else {
      toast.error('Please select an image to upload')
    }
  }

  return (
    <form className='mt-8'>
      <div className='space-y-12'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 border-b border-default-900/10 pb-12 md:grid-cols-3'>
          <div>
            <h2 className='text-base font-semibold leading-7 text-default-900'>Change Avatar</h2>
            <p className='mt-1 text-sm leading-6 text-default-500'>Upload a new avatar to change your avatar.</p>
          </div>
          <div className='grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 md:col-span-2 items-center'>
            <div className='flex flex-col items-center'>
              <img
                src={avatarUrl}
                alt='Current Avatar'
                className='h-24 w-24 rounded-full border'
              />
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
                  className='mt-4'
                >
                  Attach
                </Button>
              </label>
            </div>
            <Button
              className='mt-4 sm:mt-0 mx-10'
              onPress={handleUpdateAvatar}
              color='primary'
            >
              Update Avatar
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
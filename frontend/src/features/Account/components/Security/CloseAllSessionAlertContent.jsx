import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { homeUrls } from '../../../../routes/urls/homeUrls'
import { useAuthStore } from '../../../../store/AuthStore'
import { useAccountAPI } from '../../hooks/useAccountApi'

export function CloseAllSessionAlertContent ({ closeModal }) {
  const navigate = useNavigate()
  const cleanStore = useAuthStore((store) => store.cleanStore)
  const { logoutAllApiCall } = useAccountAPI()

  const handleCloseAllSessions = async () => {
    try {
      console.log('Cerrar todas las sesiones')
      await logoutAllApiCall()
      cleanStore()
      navigate(homeUrls.home)
    } catch (error) {
      console.log('Error cerrando todas las sesiones')
    }
  }

  return (
    <>
      <header className='flex items-center justify-start gap-2'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-danger-100'>
          <Icon icon='heroicons-outline:exclamation' className='h-6 w-6 text-danger-600' />
        </div>
        <div className='font-semibold text-default-900'>
          Cerrar todas las sesiones
        </div>
      </header>

      <div>
        <p className='mt-3 text-sm text-default-500'>
          ¿Está seguro de que desea cerrar todas las sesiones activas en todos los dispositivos?.
          Esta acción no se puede deshacer.
        </p>
      </div>

      <footer className='flex justify-end mt-4'>
        <Button color='danger' variant='flat' onPress={handleCloseAllSessions}>
          Cerrar todas las sesiones
        </Button>
        <Button color='default' variant='flat' onPress={closeModal} className='ml-3'>
          Cancelar
        </Button>
      </footer>
    </>
  )
}

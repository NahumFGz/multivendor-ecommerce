import { Button } from '@nextui-org/react'

export function CloseAllSessions ({ openModal }) {
  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-10 border-b border-default-900/10 pb-12 md:grid-cols-3'>
      <div>
        <h2 className='text-base font-semibold leading-7 text-default-900'>Close sessions</h2>
        <p className='mt-2 text-sm leading-6 text-default-500'>Cerrar todas las sesiones activas en todos los dispositivos.</p>
      </div>
      <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
        <div className='col-span-full'>
          <Button
            color='danger'
            onClick={() => openModal(true)}
          >
            Cerrar todas las sesiones
          </Button>
        </div>
      </div>
    </div>
  )
}

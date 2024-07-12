import { Icon } from '@iconify/react'

export function DashboardPage () {
  return (
    <div className='mt-48 lg:mt-64 flex flex-grow flex-col items-center gap-2'>
      <p className='text-small text-default-400'>Esta funcionalidad está en desarrollo, pronto te daremos más detalles.</p>
      <Icon className='text-default-400' icon='mdi:progress-wrench' width={50} />
    </div>
  )
}

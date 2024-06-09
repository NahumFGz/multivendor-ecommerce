import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { useSwapTheme } from '../../../store/ThemeStore'

export function ThemeSwitch () {
  const { handleSwapTheme: toggleTheme, theme } = useSwapTheme()

  return (
    <div className='flex items-center'>
      {
        theme === 'dark'
          ? <p className='text-small text-default-400'>Dark Mode</p>
          : <p className='text-small text-default-400'>Ligth Mode</p>
      }
      <div className=''>
        <Button
          isIconOnly
          radius='full'
          variant='light'
          onClick={toggleTheme}
          className='bg-transparent'
        >
          <Icon className='text-small text-default-500' icon='solar:sun-linear' width={24} />
        </Button>
      </div>
    </div>
  )
}

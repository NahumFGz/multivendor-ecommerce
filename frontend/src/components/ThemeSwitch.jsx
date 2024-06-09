import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { useSwapTheme } from '../store/ThemeStore'

export function ThemeSwitch () {
  const { handleSwapTheme: toggleTheme, theme } = useSwapTheme()

  return (
    <div className='flex items-center'>
      {
        theme === 'dark'
          ? <p className='text-small text-default-400'>Swap ligth Mode</p>
          : <p className='text-small text-default-400'>Swap dark Mode</p>
      }
      <div className=''>
        <Button
          isIconOnly
          radius='full'
          variant='light'
          onClick={toggleTheme}
          className='bg-transparent'
        >
          {
            theme === 'dark'
              ? <Icon className='text-small text-default-500' icon='solar:sun-linear' width={24} />
              : <Icon className='text-small text-default-500' icon='solar:moon-linear' width={22} />
          }
        </Button>
      </div>
    </div>
  )
}

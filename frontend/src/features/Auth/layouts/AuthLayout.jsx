import { useSwapTheme } from '../../../store/ThemeStore'

export function AuthLayout ({ children }) {
  useSwapTheme()
  return (
    <div className='h-screen w-screen'>
      {children}
    </div>
  )
}

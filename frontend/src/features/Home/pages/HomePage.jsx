import { useSwapTheme } from '../../../store/ThemeStore'

export function HomePage () {
  const { handleSwapTheme } = useSwapTheme()

  return (
    <div>
      <h1>Home Page</h1>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleSwapTheme}
      >Cambiar tema
      </button>
    </div>
  )
}

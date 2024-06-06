import { Filters } from '../components/Filters/Filters'
import { Header } from '../components/Header/Header'

export function HomeLayout ({ children }) {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <Filters />
      <div className='flex-1 overflow-y-auto'>
        {children}
      </div>
    </div>
  )
}

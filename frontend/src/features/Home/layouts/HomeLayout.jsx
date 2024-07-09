import { useEffect } from 'react'
import { useFilters } from '../../../store/FiltersStore'
import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'

export function HomeLayout ({ children }) {
  const { initializeFilters } = useFilters()
  useEffect(() => { initializeFilters() }, [])

  return (
    <div className='flex flex-col'>
      <div>
        <Header />
      </div>
      <div>
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

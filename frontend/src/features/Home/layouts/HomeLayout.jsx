import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import { useLocation } from 'react-router-dom'
import { homeUrls } from '../../../routes/urls/homeUrls'

export function HomeLayout ({ children }) {
  const location = useLocation()

  return (
    <div className='flex flex-col'>
      <div>
        <Header />
      </div>
      {location.pathname !== homeUrls.home && (
        <div>
          Filters
        </div>
      )}
      <div>
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

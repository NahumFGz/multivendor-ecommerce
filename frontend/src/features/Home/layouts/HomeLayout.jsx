import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'

export function HomeLayout ({ children }) {
  return (
    <div className='flex flex-col'>
      <div>
        <Header />
      </div>
      <div className=''>
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

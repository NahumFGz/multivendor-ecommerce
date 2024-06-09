import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'

export function HomeLayout ({ children }) {
  return (
    <div className='flex flex-col'>
      <Header />
      <div className='flex-1 overflow-y-auto'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

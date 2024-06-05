import { Header } from '../components/Header/Header'

export function HomeLayout ({ children }) {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex-1 overflow-y-auto'>
        {children}
        <p>Home Layout</p>
      </div>
    </div>
  )
}

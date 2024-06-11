import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/AuthStore'
import { authUrls } from './urls/authUrls'

export const ProtectedRoutes = () => {
  const isAuth = useAuthStore((state) => state.isAuth)

  if (!isAuth) return <Navigate to={authUrls.login} />

  return <Outlet />
}

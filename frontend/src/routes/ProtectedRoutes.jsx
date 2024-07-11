import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/AuthStore'
import { authUrls } from './urls/authUrls'

export const ProtectedRoutes = () => {
  // Captura la ubicación actual
  const location = useLocation()
  const isAuth = useAuthStore((state) => state.isAuth)

  if (!isAuth) {
    // Redirige a /login y pasa la ubicación original en el estado
    return <Navigate to={authUrls.login} state={{ from: location }} />
  }

  return <Outlet />
}

import { Navigate, Outlet, useLocation } from 'react-router-dom'
import  useAuth  from '../context/auth'

export function PrivateRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (isAuthenticated() === null) {
    return <div>Loading...</div> // Or your loading component
  }

  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
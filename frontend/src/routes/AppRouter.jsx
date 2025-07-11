import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PostsPage } from '../pages/Posts'
import { LoginPage } from '../pages/Login'
import { RegisterPage } from '../pages/Register'
import { PrivateRoute } from './PrivateRoute'
import { AuthProvider } from '../context/auth'

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<PostsPage />} />
            <Route path="/posts" element={<PostsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
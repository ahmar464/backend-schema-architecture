import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'

// Create context at module level (not inside component)
const AuthContext = createContext()

// Named export for the provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      setUser({ email: 'user@example.com' })
    }
    setIsReady(true)
  }, [])

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/token/', {
        email: credentials.email,
        password: credentials.password
      })
      
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      setUser({ email: credentials.email })
      return true
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }

  const isAuthenticated = () => {
    return !!localStorage.getItem('access_token')
  }

  if (!isReady) return null

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Default export for the hook
export default function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
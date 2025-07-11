import { useNavigate, useLocation, Link } from 'react-router-dom'

import  useAuth  from '../context/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login({
      email: e.target.email.value,
      password: e.target.password.value
    })
    
    if (success) {
      const redirectTo = location.state?.from?.pathname || '/'
      navigate(redirectTo)
    } else {
      alert('Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          required 
        />
        <button type="submit">Login</button>
      </form>
      <p className="auth-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  )
}
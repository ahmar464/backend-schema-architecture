import { useNavigate } from 'react-router-dom'
import  useAuth  from '../context/auth'
import api from '../api'

export function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      email: e.target.email.value,
      name: e.target.name.value,
      password: e.target.password.value
    }
    
    try {
      // 1. Register the user
      await api.post('/register/', formData)
      
      // 2. Automatically log them in
      const loginSuccess = await login({
        email: formData.email,
        password: formData.password
      })
      
      // 3. Redirect if successful
      if (loginSuccess) {
        navigate('/')
      }
    } catch (error) {
      console.error('Registration failed:', error)
      alert(`Registration failed: ${error.response?.data?.detail || 'Please try again'}`)
    }
  }

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="name" 
          type="text" 
          placeholder="Full Name" 
          required 
        />
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
          minLength="8"
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  )
}
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import '../../styles/AdminLogin.css'

const AdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, admin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (admin) {
      navigate('/admin/dashboard')
    }
  }, [admin, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(username, password)

    if (result.success) {
      navigate('/admin/dashboard')
    } else {
      setError(result.message || 'लॉगिन असफल')
    }

    setLoading(false)
  }

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-card">
          <h1>एडमिन लॉगिन</h1>
          <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
              <label>उपयोगकर्ता नाम</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="उपयोगकर्ता नाम दर्ज करें"
              />
            </div>
            <div className="form-group">
              <label>पासवर्ड</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="पासवर्ड दर्ज करें"
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'लॉगिन हो रहा है...' : 'लॉगिन करें'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin


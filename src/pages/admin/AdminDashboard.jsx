import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../styles/AdminDashboard.css'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    articles: 0,
    medicines: 0
  })
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [articlesRes, medicinesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/articles`),
        axios.get(`${API_BASE_URL}/medicines`)
      ])
      setStats({
        articles: articlesRes.data.length,
        medicines: medicinesRes.data.length
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">लोड हो रहा है...</div>
  }

  return (
    <div className="admin-dashboard">
      <h1>डैशबोर्ड</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>कुल लेख</h3>
          <p className="stat-number">{stats.articles}</p>
          <Link to="/admin/articles" className="stat-link">
            लेख प्रबंधन →
          </Link>
        </div>
        <div className="stat-card">
          <h3>कुल दवाएं</h3>
          <p className="stat-number">{stats.medicines}</p>
          <Link to="/admin/medicines" className="stat-link">
            दवा प्रबंधन →
          </Link>
        </div>
      </div>
      <div className="quick-actions">
        <h2>त्वरित कार्य</h2>
        <div className="actions-grid">
          <Link to="/admin/articles" className="action-card">
            <h3>नया लेख जोड़ें</h3>
            <p>एक नया होम्योपैथी लेख बनाएं</p>
          </Link>
          <Link to="/admin/medicines" className="action-card">
            <h3>नई दवा जोड़ें</h3>
            <p>एक नई होम्योपैथिक दवा जोड़ें</p>
          </Link>
          <Link to="/" className="action-card">
            <h3>वेबसाइट देखें</h3>
            <p>सार्वजनिक वेबसाइट पर जाएं</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard


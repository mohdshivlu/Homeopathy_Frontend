import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/Articles.css'

const Articles = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles`)
      setArticles(response.data)
    } catch (err) {
      setError('लेख लोड करने में त्रुटि')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">लोड हो रहा है...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="articles-page">
      <div className="container">
        <h1>होम्योपैथी लेख</h1>
        {articles.length === 0 ? (
          <div className="no-articles">
            <p>अभी तक कोई लेख उपलब्ध नहीं है।</p>
          </div>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.slug}`}
                className="article-card"
              >
                <h3>{article.title}</h3>
                <p className="article-preview">
                  {article.content.substring(0, 150)}...
                </p>
                <span className="read-more">पढ़ना जारी रखें →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Articles


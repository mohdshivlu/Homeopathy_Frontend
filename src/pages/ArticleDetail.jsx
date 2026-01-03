import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/ArticleDetail.css'

const ArticleDetail = () => {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

  useEffect(() => {
    fetchArticle()
  }, [slug])

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/articles/slug/${slug}`)
      setArticle(response.data)
    } catch (err) {
      setError('लेख लोड करने में त्रुटि')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">लोड हो रहा है...</div>
  }

  if (error || !article) {
    return (
      <div className="article-detail">
        <div className="container">
          <div className="error">{error || 'लेख नहीं मिला'}</div>
          <Link to="/articles" className="btn-primary">
            लेख सूची पर वापस जाएं
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="article-detail">
      <div className="container">
        <Link to="/articles" className="back-link">← लेख सूची पर वापस जाएं</Link>
        <article className="article-content">
          <h1>{article.title}</h1>
          <div className="article-body">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}

export default ArticleDetail


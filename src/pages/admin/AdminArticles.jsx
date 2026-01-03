import { useState, useEffect } from 'react'
import axios from 'axios'
import '../../styles/AdminArticles.css'

const AdminArticles = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: ''
  })

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  const token = localStorage.getItem('adminToken')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (editingArticle) {
        await axios.put(
          `${API_BASE_URL}/articles/${editingArticle.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } else {
        await axios.post(
          `${API_BASE_URL}/articles`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }
      setShowForm(false)
      setEditingArticle(null)
      setFormData({ title: '', content: '', slug: '' })
      fetchArticles()
    } catch (err) {
      setError(err.response?.data?.message || 'त्रुटि हुई')
    }
  }

  const handleEdit = (article) => {
    setEditingArticle(article)
    setFormData({
      title: article.title,
      content: article.content,
      slug: article.slug
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('क्या आप इस लेख को हटाना चाहते हैं?')) {
      return
    }

    try {
      await axios.delete(`${API_BASE_URL}/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchArticles()
    } catch (err) {
      setError('लेख हटाने में त्रुटि')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingArticle(null)
    setFormData({ title: '', content: '', slug: '' })
  }

  if (loading) {
    return <div className="loading">लोड हो रहा है...</div>
  }

  return (
    <div className="admin-articles">
      <div className="page-header">
        <h1>लेख प्रबंधन</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setShowForm(true)
            setEditingArticle(null)
            setFormData({ title: '', content: '', slug: '' })
          }}
        >
          + नया लेख
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <div className="form-modal">
          <div className="form-card">
            <h2>{editingArticle ? 'लेख संपादित करें' : 'नया लेख जोड़ें'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>शीर्षक</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>स्लग (URL-friendly)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  placeholder="example-article"
                />
              </div>
              <div className="form-group">
                <label>सामग्री</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows="10"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingArticle ? 'अपडेट करें' : 'जोड़ें'}
                </button>
                <button type="button" className="btn-outline" onClick={handleCancel}>
                  रद्द करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="articles-list">
        {articles.length === 0 ? (
          <p>कोई लेख नहीं है।</p>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="article-item">
              <div className="article-info">
                <h3>{article.title}</h3>
                <p className="article-slug">/{article.slug}</p>
                <p className="article-preview">
                  {article.content.substring(0, 100)}...
                </p>
              </div>
              <div className="article-actions">
                <button
                  className="btn-secondary"
                  onClick={() => handleEdit(article)}
                >
                  संपादित करें
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(article.id)}
                >
                  हटाएं
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminArticles


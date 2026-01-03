import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/AdminLayout.css'

const AdminLayout = () => {
  const { admin, logout } = useAuth()
  const location = useLocation()

  return (
    <div className="admin-layout">
      {admin && (
        <nav className="admin-nav">
          <div className="admin-nav-container">
            <h2>एडमिन पैनल</h2>
            <div className="admin-nav-links">
              <Link
                to="/admin/dashboard"
                className={location.pathname === '/admin/dashboard' ? 'active' : ''}
              >
                डैशबोर्ड
              </Link>
              <Link
                to="/admin/articles"
                className={location.pathname === '/admin/articles' ? 'active' : ''}
              >
                लेख
              </Link>
              <Link
                to="/admin/medicines"
                className={location.pathname === '/admin/medicines' ? 'active' : ''}
              >
                दवाएं
              </Link>
              <Link to="/" onClick={logout}>
                लॉगआउट
              </Link>
            </div>
          </div>
        </nav>
      )}
      <main className="admin-main">
        <Outlet />
      </main>
      {admin && (
        <footer className="admin-footer">
          <div className="admin-footer-container">
            <p className="developer-credit">
              Developed by: Mohd Shivlu | Contact: <a href="mailto:mohdshivlu1245@gmail.com" className="admin-footer-email">mohdshivlu1245@gmail.com</a>
            </p>
          </div>
        </footer>
      )}
    </div>
  )
}

export default AdminLayout


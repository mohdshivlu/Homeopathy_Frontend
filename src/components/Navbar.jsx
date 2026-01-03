import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h1>होम्योपैथी चूज एंड यूज</h1>
        </Link>
        <button
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              होम
            </Link>
          </li>
          <li>
            <Link to="/articles" onClick={() => setIsMenuOpen(false)}>
              लेख
            </Link>
          </li>
          <li>
            <Link to="/choose-and-use" onClick={() => setIsMenuOpen(false)}>
              चूज एंड यूज
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              हमारे बारे में
            </Link>
          </li>
          <li>
            <Link to="/admin/login" onClick={() => setIsMenuOpen(false)}>
              एडमिन
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar


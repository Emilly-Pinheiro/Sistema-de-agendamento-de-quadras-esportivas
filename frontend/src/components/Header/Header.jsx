import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-brand">
        <span className="header-logo">🌱</span>
        <span className="header-title">Curtesporte - Sistema De Reserva De Quadras</span>
      </Link>
      <span className="header-user" title="Usuário">👤</span>
    </header>
  )
}

export default Header

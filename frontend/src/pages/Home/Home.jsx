import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import './Home.css'

function Home() {
  return (
    <div className="page">
      <Header />
      <div className="card home-card">
        <h2 className="home-question">O que deseja fazer agora?</h2>
        <div className="home-options">
          <button className="home-option" disabled title="Em breve">
            <span className="home-option-icon">📅</span>
            Gerenciar Reservas
          </button>
          <Link to="/quadras" className="home-option">
            <span className="home-option-icon">🏠</span>
            Gerenciar Quadras
          </Link>
          <button className="home-option" disabled title="Em breve">
            <span className="home-option-icon">👥</span>
            Gerenciar Jogadores
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home

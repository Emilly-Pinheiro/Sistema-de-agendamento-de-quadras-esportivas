import { Link } from '../../routes/navigation.jsx'
import { useState } from 'react'

export default function HeroSection() {
  const [playersMenuOpen, setPlayersMenuOpen] = useState(false)

  return (
    <section className="hero-section" aria-labelledby="hero-title" style={{ '--hero-image': "url('https://www.figma.com/api/mcp/asset/6fd4c5b6-2513-4512-b9c3-fec57d258acf.png')" }}>
      <div className="container hero-section__content">
        <h1 id="hero-title">Coloque seu corpo em movimento e supere seus próprios limites!</h1>
        <p>Agende um horário conosco e se desafie com seus amigos</p>
        <div className="hero-section__actions">
          <Link className="button button--primary button--hero" to="/agendar">Agendar Horário</Link>
          <div className="hero-players-menu">
            <button
              type="button"
              className="button button--success button--hero"
              aria-expanded={playersMenuOpen}
              aria-controls="hero-players-options"
              onClick={() => setPlayersMenuOpen((open) => !open)}
            >
              Jogadores <span aria-hidden="true">{playersMenuOpen ? '▴' : '▾'}</span>
            </button>
            {playersMenuOpen && (
              <nav id="hero-players-options" className="hero-players-menu__options" aria-label="Opções de jogadores">
                <Link to="/jogadores/novo">Cadastrar jogador</Link>
                <Link to="/jogadores">Ver jogadores</Link>
              </nav>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

import { Link } from '../../routes/navigation.jsx'

export default function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-title" style={{ '--hero-image': "url('https://www.figma.com/api/mcp/asset/6fd4c5b6-2513-4512-b9c3-fec57d258acf.png')" }}>
      <div className="container hero-section__content">
        <h1 id="hero-title">Coloque seu corpo em movimento e supere seus próprios limites!</h1>
        <p>Agende um horário conosco e se desafie com seus amigos</p>
        <div className="hero-section__actions">
          <Link className="button button--primary button--hero" to="/nova-reserva">Agendar Horário</Link>
        </div>
      </div>
    </section>
  )
}

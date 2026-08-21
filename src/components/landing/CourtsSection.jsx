import { useRef } from 'react'
import { courts } from '../../data/landingContent.js'
import { Link } from '../../routes/navigation.jsx'

export default function CourtsSection() {
  const trackRef = useRef(null)
  const scroll = (direction) => trackRef.current?.scrollBy({ left: direction * Math.max(trackRef.current.clientWidth * 0.7, 280), behavior: 'smooth' })
  return (
    <section className="courts-section" aria-labelledby="courts-title">
      <div className="container courts-section__heading"><h2 id="courts-title">Conheça nossas quadras!</h2></div>
      <div className="courts-carousel"><button className="carousel-button" type="button" onClick={() => scroll(-1)} aria-label="Ver quadra anterior">‹</button><div ref={trackRef} className="courts-track">
        {courts.map((court) => <article key={court.id} className="court-card"><div className="court-card__media"><img src={court.image} alt={court.name} loading="lazy" onError={(event) => { event.currentTarget.src = court.fallback }} /></div><div className="court-card__body"><h3>{court.name}</h3><p>⌖ &nbsp;{court.location}</p><Link to={`/agendar?quadra=${court.id}`} className="court-card__button">Ver Horários</Link></div></article>)}
      </div><button className="carousel-button" type="button" onClick={() => scroll(1)} aria-label="Ver próxima quadra">›</button></div>
    </section>
  )
}

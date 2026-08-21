import { benefits } from '../../data/landingContent.js'

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="benefits-section" aria-labelledby="benefits-title">
      <div className="container">
        <h2 id="benefits-title" className="section-title section-title--center">O momento é agora!</h2>
        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <article key={benefit.id} className="benefit-card">
              <div className="benefit-card__media"><img className="benefit-card__image" src={benefit.image} alt={benefit.alt} loading="lazy" onError={(event) => { event.currentTarget.src = benefit.fallback }} /></div>
              <h3>{benefit.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

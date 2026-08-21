import { advantages } from '../../data/landingContent.js'

export default function WhyChooseUsSection() {
  return (
    <section className="why-section" aria-labelledby="why-title">
      <div className="container why-section__layout">
        <div className="why-section__media"><img src="https://www.figma.com/api/mcp/asset/e0d1220d-c5c9-4c6c-9091-f5d2547faf84.png" alt="Pessoa praticando esporte em uma quadra" loading="lazy" onError={(event) => { event.currentTarget.src = '/images/landing/porque-agendar.png' }} /></div>
        <div className="why-section__content">
          <h2 id="why-title">Por que agendar conosco?</h2>
          <div className="advantages-list">
            {advantages.map((advantage) => <article key={advantage.id} className="advantage"><span className="advantage__icon" aria-hidden="true">{advantage.icon}</span><div><h3>{advantage.title}</h3><p>{advantage.description}</p></div></article>)}
          </div>
        </div>
      </div>
    </section>
  )
}

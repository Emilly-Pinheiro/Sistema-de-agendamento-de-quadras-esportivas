import Brand from '../../components/brand/Brand.jsx'
import { Link } from '../../routes/navigation.jsx'

export default function PlaceholderPage({ title, description }) {
  return <main className="placeholder-page"><div className="placeholder-page__glow" /><div className="placeholder-page__content"><Brand compact /><span className="placeholder-page__tag">Em breve</span><h1>{title}</h1><p>{description}</p><Link className="button button--primary" to="/">← Voltar para a página inicial</Link></div></main>
}

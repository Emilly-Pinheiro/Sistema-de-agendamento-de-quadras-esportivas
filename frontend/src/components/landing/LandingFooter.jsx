import Brand from '../brand/Brand.jsx'
import { Link } from '../../routes/navigation.jsx'

export default function LandingFooter() {
  return (
    <footer className="landing-footer"><div className="container"><div className="landing-footer__brand"><Brand /></div><div className="landing-footer__grid"><section><h2>Fale Conosco</h2><a href="mailto:contato@curtesporte.com.br">contato@curtesporte.com.br</a><p>(11) 4321-1234</p></section><section><h2>Nossas Redes</h2><div className="social-links" aria-label="Redes sociais"><span>◎</span><span>♡</span><span>f</span></div></section><section><h2>Plataforma</h2><Link to="/">Dúvidas Frequentes</Link><Link to="/jogadores">Gerenciar jogadores</Link></section></div><p className="landing-footer__copyright">©2026 - Todos direitos reservados.</p></div></footer>
  )
}

import Brand from '../brand/Brand.jsx'
import { Link } from '../../routes/navigation.jsx'

export default function LandingHeader() {
  return (
    <header className="landing-header">
      <div className="container landing-header__inner">
        <Brand />
        <nav className="landing-header__actions" aria-label="Ações da conta">
          <Link className="button button--outline" to="/login">Entrar</Link>
          <Link className="button button--success" to="/cadastro">Criar conta</Link>
        </nav>
      </div>
    </header>
  )
}

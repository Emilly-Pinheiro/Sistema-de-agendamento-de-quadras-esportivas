import LandingPage from '../pages/Landing/LandingPage.jsx'
import PlaceholderPage from '../pages/Placeholder/PlaceholderPage.jsx'
import PlayersPage from '../pages/Players/PlayersPage.jsx'
import useLocation from './useLocation.js'

const pages = {
  '/entrar': ['Entrar', 'A autenticação será implementada posteriormente.'],
  '/cadastro': ['Cadastre-se', 'O cadastro de acesso será implementado posteriormente.'],
  '/agendar': ['Agendar horário', 'O fluxo de reservas será implementado posteriormente.'],
}

export default function AppRouter() {
  const { pathname } = useLocation()
  if (pathname === '/') return <LandingPage />
  if (pathname.startsWith('/jogadores')) return <PlayersPage pathname={pathname} />
  const page = pages[pathname] ?? ['Página não encontrada', 'O endereço informado não existe.']
  return <PlaceholderPage title={page[0]} description={page[1]} />
}

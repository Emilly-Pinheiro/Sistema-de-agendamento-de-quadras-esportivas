import { useMemo, useState } from 'react'
import { Link } from '../../routes/navigation.jsx'
import './PlayersPage.css'

const initialPlayers = [
  { id: 'roberto-lima', name: 'Roberto Lima', phone: '(88) 9 1234-5678', email: 'roberto@jogador.com' },
  { id: 'guilherme-holanda', name: 'Guilherme Holanda', phone: '(88) 9 8765-4321', email: 'guilherme@jogador.com' },
  { id: 'antonio-silva', name: 'Antonio Silva', phone: '(85) 9 4567-1234', email: 'antonio@jogador.com' },
]

function loadPlayers() {
  try {
    const saved = localStorage.getItem('curtesporte-players')
    return saved ? JSON.parse(saved) : initialPlayers
  } catch {
    return initialPlayers
  }
}

function navigate(to) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

function PlayersHeader() {
  return <header className="players-header"><Link className="players-brand" to="/"><img src="https://www.figma.com/api/mcp/asset/318216ef-cb03-4e8d-a4f6-d2993bb48cbc.svg" alt="" /><span><strong>Curtesporte - Sistema de reserva de quadras</strong><i /></span></Link><span className="players-header__user" aria-hidden="true">♙</span></header>
}

function PlayerAvatar() {
  return <span className="player-avatar" aria-hidden="true"><i /></span>
}

function PlayerCard({ player, onDelete }) {
  return <article className="player-card"><Link className="player-card__edit" to={`/jogadores/${player.id}/editar`} aria-label={`Editar ${player.name}`}>✎</Link><PlayerAvatar /><dl><div><dt>Nome:</dt><dd>{player.name}</dd></div><div><dt>Telefone:</dt><dd>{player.phone}</dd></div><div><dt>E-mail:</dt><dd>{player.email}</dd></div></dl><button type="button" className="players-button players-button--danger" onClick={() => onDelete(player)}>Remover Jogador</button></article>
}

function PlayersList({ players, setPlayers }) {
  const [query, setQuery] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)
  const visiblePlayers = useMemo(() => players.filter((player) => `${player.name} ${player.phone} ${player.email}`.toLowerCase().includes(query.toLowerCase())), [players, query])
  function confirmDelete() {
    const next = players.filter((player) => player.id !== pendingDelete.id)
    setPlayers(next)
    localStorage.setItem('curtesporte-players', JSON.stringify(next))
    setPendingDelete(null)
  }
  return <><div className="players-toolbar"><h1>Gerenciar Jogadores</h1><label className="players-search"><span className="sr-only">Pesquisar jogadores</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar" /><span>⌕</span></label><span className="players-filter" aria-hidden="true">▽</span><Link className="players-button players-button--primary players-button--add" to="/jogadores/novo">Cadastrar Jogador</Link></div><section className={`players-grid${visiblePlayers.length < 3 ? ' players-grid--center' : ''}`} aria-live="polite">{visiblePlayers.map((player) => <PlayerCard key={player.id} player={player} onDelete={setPendingDelete} />)}{visiblePlayers.length === 0 && <p className="players-empty">Nenhum jogador encontrado.</p>}</section>{pendingDelete && <div className="players-modal-backdrop" role="presentation"><div className="players-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><span className="players-modal__alert">△</span><p id="delete-title">Tem certeza de que deseja remover<br />o jogador <strong>{pendingDelete.name}</strong>?</p><div><button type="button" onClick={() => setPendingDelete(null)}>Não</button><button type="button" onClick={confirmDelete}>Sim</button></div></div></div>}</>
}

function PlayerForm({ player, players, setPlayers }) {
  const editing = Boolean(player)
  const [form, setForm] = useState(player ?? { name: '', email: '', phone: '' })
  function update(event) { setForm((current) => ({ ...current, [event.target.name]: event.target.value })) }
  function submit(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return
    const slug = editing ? player.id : `${form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`
    const saved = { ...form, id: slug }
    const next = editing ? players.map((item) => item.id === player.id ? saved : item) : [...players, saved]
    setPlayers(next)
    localStorage.setItem('curtesporte-players', JSON.stringify(next))
    navigate('/jogadores')
  }
  return <><h1 className="players-form-title">{editing ? 'Editar Jogador' : 'Cadastrar Jogador'}</h1><form className="player-form" onSubmit={submit}><input name="name" value={form.name} onChange={update} placeholder="Nome completo" aria-label="Nome completo" required /><input name="email" type="email" value={form.email} onChange={update} placeholder="Email" aria-label="Email" required /><input name="phone" value={form.phone} onChange={update} placeholder="Telefone" aria-label="Telefone" required /><div className="player-form__actions"><Link className="players-button players-button--primary" to="/jogadores">Cancelar</Link><button className="players-button players-button--primary" type="submit">{editing ? 'Salvar Alterações' : 'Cadastrar'}</button></div></form></>
}

export default function PlayersPage({ pathname }) {
  const [players, setPlayers] = useState(loadPlayers)
  const editingMatch = pathname.match(/^\/jogadores\/([^/]+)\/editar$/)
  const editingPlayer = editingMatch ? players.find((player) => player.id === editingMatch[1]) : null
  return <div className="players-page"><PlayersHeader /><main>{pathname === '/jogadores/novo' ? <PlayerForm players={players} setPlayers={setPlayers} /> : editingMatch ? <PlayerForm player={editingPlayer} players={players} setPlayers={setPlayers} /> : <PlayersList players={players} setPlayers={setPlayers} />}</main></div>
}

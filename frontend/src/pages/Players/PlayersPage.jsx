import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Container, InputAdornment, IconButton, TextField, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Link } from '../../routes/navigation.jsx'
import { Header } from '../../components/Header.jsx'
import './PlayersPage.css'

async function request(path, options = {}) {
  const response = await fetch(`/jogadores${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.erro || 'Não foi possível concluir a operação.')
  }

  return data
}

function toPlayer(jogador) {
  return {
    id: jogador.id,
    name: jogador.nome,
    phone: jogador.telefone,
    email: jogador.email,
  }
}

function navigate(to) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

function PlayerAvatar() {
  return <span className="player-avatar" aria-hidden="true"><i /></span>
}

function PlayerCard({ player, onDelete }) {
  return <article className="player-card"><Link className="player-card__edit" to={`/jogadores/${player.id}/editar`} aria-label={`Editar ${player.name}`}><EditIcon fontSize="small" /></Link><PlayerAvatar /><dl><div><dt>Nome:</dt><dd>{player.name}</dd></div><div><dt>Telefone:</dt><dd>{player.phone}</dd></div><div><dt>E-mail:</dt><dd>{player.email}</dd></div></dl><button type="button" className="players-button players-button--danger" onClick={() => onDelete(player)}>Remover Jogador</button></article>
}

function PlayersList({ players, setPlayers, setError }) {
  const [query, setQuery] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)
  const visiblePlayers = useMemo(() => players.filter((player) => `${player.name} ${player.phone} ${player.email}`.toLowerCase().includes(query.toLowerCase())), [players, query])
  async function confirmDelete() {
    try {
      await request(`/${pendingDelete.id}`, { method: 'DELETE' })
      setPlayers((current) => current.filter((player) => player.id !== pendingDelete.id))
      setPendingDelete(null)
    } catch (error) {
      setError(error.message)
    }
  }
  return <><Container maxWidth="lg" sx={{ mt: 5 }}><Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5, flexWrap: 'wrap', gap: 2 }}><Typography variant="h4" fontWeight="bold" sx={{ fontFamily: 'serif' }}>Gerenciar Jogadores</Typography><Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, maxWidth: 500 }}><TextField placeholder="Pesquisar..." value={query} fullWidth size="small" onChange={(event) => setQuery(event.target.value)} sx={{ backgroundColor: 'white', borderRadius: 50, '& .MuiOutlinedInput-root': { borderRadius: 50 } }} InputProps={{ endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment> }} /><IconButton aria-label="Filtrar jogadores"><FilterAltOutlinedIcon sx={{ color: 'black' }} /></IconButton></Box><Button component={Link} to="/jogadores/novo" variant="contained" sx={{ backgroundColor: '#5D2D6F', borderRadius: 50, textTransform: 'none', px: 4, py: 1, fontSize: '1rem', boxShadow: '0px 4px 10px rgba(94, 42, 132, 0.4)', '&:hover': { backgroundColor: '#4a148c' } }}>Cadastrar Jogador</Button></Box><section className={`players-grid${visiblePlayers.length < 3 ? ' players-grid--center' : ''}`} aria-live="polite">{visiblePlayers.map((player) => <PlayerCard key={player.id} player={player} onDelete={setPendingDelete} />)}{visiblePlayers.length === 0 && <p className="players-empty">Nenhum jogador encontrado.</p>}</section></Container>{pendingDelete && <div className="players-modal-backdrop" role="presentation"><div className="players-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><span className="players-modal__alert"><WarningAmberIcon /></span><p id="delete-title">Tem certeza de que deseja remover<br />o jogador <strong>{pendingDelete.name}</strong>?</p><div><button type="button" onClick={() => setPendingDelete(null)}>Não</button><button type="button" onClick={confirmDelete}>Sim</button></div></div></div>}</>
}

function PlayerForm({ player, players, setPlayers, setError }) {
  const editing = Boolean(player)
  const [form, setForm] = useState(player ?? { name: '', email: '', phone: '' })
  function update(event) { setForm((current) => ({ ...current, [event.target.name]: event.target.value })) }
  async function submit(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return
    try {
      const payload = {
        nome: form.name.trim(),
        email: form.email.trim(),
        telefone: form.phone.trim(),
      }
      const data = await request(editing ? `/${player.id}` : '', {
        method: editing ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      })
      const saved = toPlayer(data.dados || data)
      const next = editing ? players.map((item) => item.id === player.id ? saved : item) : [...players, saved]
      setPlayers(next)
      navigate('/jogadores')
    } catch (error) {
      setError(error.message)
    }
  }
  return <><h1 className="players-form-title">{editing ? 'Editar Jogador' : 'Cadastrar Jogador'}</h1><form className="player-form" onSubmit={submit}><input name="name" value={form.name} onChange={update} placeholder="Nome completo" aria-label="Nome completo" required /><input name="email" type="email" value={form.email} onChange={update} placeholder="Email" aria-label="Email" required /><input name="phone" value={form.phone} onChange={update} placeholder="Telefone" aria-label="Telefone" required /><div className="player-form__actions"><Link className="players-button players-button--primary" to="/jogadores">Cancelar</Link><button className="players-button players-button--primary" type="submit">{editing ? 'Salvar Alterações' : 'Cadastrar'}</button></div></form></>
}

export default function PlayersPage({ pathname }) {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const editingMatch = pathname.match(/^\/jogadores\/([^/]+)\/editar$/)
  const editingPlayer = editingMatch ? players.find((player) => player.id === editingMatch[1]) : null

  useEffect(() => {
    request('')
      .then((data) => setPlayers(data.map(toPlayer)))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  return <div className="players-page"><Header /><main>{error && <p className="players-empty">{error}</p>}{loading ? <p className="players-empty">Carregando jogadores...</p> : pathname === '/jogadores/novo' ? <PlayerForm players={players} setPlayers={setPlayers} setError={setError} /> : editingMatch ? <PlayerForm player={editingPlayer} players={players} setPlayers={setPlayers} setError={setError} /> : <PlayersList players={players} setPlayers={setPlayers} setError={setError} />}</main></div>
}

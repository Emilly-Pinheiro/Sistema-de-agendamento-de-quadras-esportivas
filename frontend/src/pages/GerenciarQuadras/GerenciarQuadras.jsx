import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import QuadraCard from '../../components/QuadraCard/QuadraCard.jsx'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal.jsx'
import { listarQuadras, deletarQuadra } from '../../services/quadraService.js'
import './GerenciarQuadras.css'

function GerenciarQuadras() {
  const [quadras, setQuadras] = useState([])
  const [busca, setBusca] = useState('')
  const [quadraParaExcluir, setQuadraParaExcluir] = useState(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    carregarQuadras()
  }, [])

  function carregarQuadras(termo) {
    listarQuadras(termo)
      .then(setQuadras)
      .catch((error) => setErro(error.message))
  }

  function handleBuscar(event) {
    event.preventDefault()
    carregarQuadras(busca)
  }

  async function confirmarExclusao() {
    try {
      await deletarQuadra(quadraParaExcluir.id)
      setQuadras((atual) => atual.filter((quadra) => quadra.id !== quadraParaExcluir.id))
      setQuadraParaExcluir(null)
    } catch (error) {
      setErro(error.message)
    }
  }

  return (
    <div className="page">
      <Header />
      <div className="card">
        <div className="gerenciar-quadras-topo">
          <h2>Gerenciar Quadras</h2>
          <form className="gerenciar-quadras-busca" onSubmit={handleBuscar}>
            <input
              type="search"
              placeholder="Pesquisar"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
          </form>
          <Link to="/quadras/nova" className="btn btn-primary">
            Adicionar Quadra
          </Link>
        </div>

        {erro && <p className="gerenciar-quadras-erro">{erro}</p>}

        <div className="gerenciar-quadras-lista">
          {quadras.map((quadra) => (
            <QuadraCard key={quadra.id} quadra={quadra} onExcluir={setQuadraParaExcluir} />
          ))}
          {quadras.length === 0 && !erro && <p>Nenhuma quadra cadastrada.</p>}
        </div>
      </div>

      {quadraParaExcluir && (
        <ConfirmModal
          mensagem={`Tem certeza de que deseja excluir a quadra ${quadraParaExcluir.nome}?`}
          onCancelar={() => setQuadraParaExcluir(null)}
          onConfirmar={confirmarExclusao}
        />
      )}
    </div>
  )
}

export default GerenciarQuadras

import { Link } from 'react-router-dom'
import { urlDaImagem } from '../../services/quadraService.js'
import './QuadraCard.css'

function QuadraCard({ quadra, onExcluir }) {
  const imagem = quadra.imagens?.[0]

  return (
    <div className="quadra-card">
      <div className="quadra-card-imagem">
        {imagem ? <img src={urlDaImagem(imagem)} alt={quadra.nome} /> : <div className="quadra-card-sem-imagem" />}

        <Link to={`/quadras/${quadra.id}/editar`} className="quadra-card-botao quadra-card-editar" title="Editar">
          ✏️
        </Link>
        <button className="quadra-card-botao quadra-card-excluir" title="Excluir" onClick={() => onExcluir(quadra)}>
          🗑️
        </button>
      </div>
      <strong className="quadra-card-nome">{quadra.nome}</strong>
      <span className="quadra-card-local">📍 {quadra.cidade} - {quadra.uf}</span>
    </div>
  )
}

export default QuadraCard

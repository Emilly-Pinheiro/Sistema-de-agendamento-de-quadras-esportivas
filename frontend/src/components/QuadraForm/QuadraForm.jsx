import { useRef, useState } from 'react'
import { urlDaImagem } from '../../services/quadraService.js'
import './QuadraForm.css'

const CAMPOS_INICIAIS = {
  nome: '',
  modalidade: '',
  cep: '',
  cidade: '',
  uf: '',
  rua: '',
  numero: '',
}

function QuadraForm({ initialData, submitLabel, onSubmit, onCancel }) {
  const [campos, setCampos] = useState({ ...CAMPOS_INICIAIS, ...initialData })
  const [imagensExistentes, setImagensExistentes] = useState(initialData?.imagens || [])
  const [novasImagens, setNovasImagens] = useState([])
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const inputArquivoRef = useRef(null)

  function handleChange(event) {
    const { name, value } = event.target
    setCampos((atual) => ({ ...atual, [name]: value }))
  }

  function handleAdicionarImagens(event) {
    setNovasImagens((atual) => [...atual, ...Array.from(event.target.files)])
    event.target.value = ''
  }

  function removerImagemExistente(imagem) {
    setImagensExistentes((atual) => atual.filter((item) => item !== imagem))
  }

  function removerNovaImagem(indice) {
    setNovasImagens((atual) => atual.filter((_, i) => i !== indice))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErro('')
    setEnviando(true)

    const formData = new FormData()
    Object.entries(campos).forEach(([chave, valor]) => formData.append(chave, valor))
    formData.append('imagensMantidas', JSON.stringify(imagensExistentes))
    novasImagens.forEach((arquivo) => formData.append('imagens', arquivo))

    try {
      await onSubmit(formData)
    } catch (error) {
      setErro(error.message)
      setEnviando(false)
    }
  }

  return (
    <form className="quadra-form" onSubmit={handleSubmit}>
      <div className="quadra-form-linha">
        <div className="form-field">
          <label htmlFor="nome">Nome</label>
          <input id="nome" name="nome" value={campos.nome} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label htmlFor="modalidade">Modalidade</label>
          <input id="modalidade" name="modalidade" value={campos.modalidade} onChange={handleChange} required />
        </div>
      </div>

      <div className="quadra-form-linha">
        <div className="form-field">
          <label htmlFor="cep">CEP (00000-000)</label>
          <input id="cep" name="cep" value={campos.cep} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label htmlFor="cidade">Cidade</label>
          <input id="cidade" name="cidade" value={campos.cidade} onChange={handleChange} required />
        </div>
        <div className="form-field form-field-uf">
          <label htmlFor="uf">UF</label>
          <input id="uf" name="uf" maxLength={2} value={campos.uf} onChange={handleChange} required />
        </div>
      </div>

      <div className="quadra-form-linha">
        <div className="form-field">
          <label htmlFor="rua">Rua</label>
          <input id="rua" name="rua" value={campos.rua} onChange={handleChange} required />
        </div>
        <div className="form-field form-field-numero">
          <label htmlFor="numero">Nº</label>
          <input id="numero" name="numero" value={campos.numero} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-field">
        <label>Imagens da quadra</label>
        <div className="quadra-form-imagens">
          {imagensExistentes.map((imagem) => (
            <span className="quadra-form-chip" key={imagem}>
              <img src={urlDaImagem(imagem)} alt="" />
              <button type="button" onClick={() => removerImagemExistente(imagem)}>
                ✕
              </button>
            </span>
          ))}
          {novasImagens.map((arquivo, indice) => (
            <span className="quadra-form-chip" key={`${arquivo.name}-${indice}`}>
              {arquivo.name}
              <button type="button" onClick={() => removerNovaImagem(indice)}>
                ✕
              </button>
            </span>
          ))}
          <button
            type="button"
            className="quadra-form-upload"
            onClick={() => inputArquivoRef.current?.click()}
          >
            + Adicionar
          </button>
          <input
            ref={inputArquivoRef}
            className="quadra-form-input-arquivo"
            type="file"
            accept="image/*"
            multiple
            onChange={handleAdicionarImagens}
          />
        </div>
      </div>

      {erro && <p className="quadra-form-erro">{erro}</p>}

      <div className="quadra-form-acoes">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default QuadraForm

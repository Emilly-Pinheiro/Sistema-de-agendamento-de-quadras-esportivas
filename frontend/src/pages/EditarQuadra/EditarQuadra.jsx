import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import QuadraForm from '../../components/QuadraForm/QuadraForm.jsx'
import { buscarQuadraPorId, atualizarQuadra } from '../../services/quadraService.js'

function EditarQuadra() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quadra, setQuadra] = useState(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    buscarQuadraPorId(id)
      .then(setQuadra)
      .catch((error) => setErro(error.message))
  }, [id])

  async function handleSubmit(formData) {
    await atualizarQuadra(id, formData)
    navigate('/quadras')
  }

  return (
    <div className="page">
      <Header />
      <div className="card">
        <h2>Editar Quadra</h2>
        {erro && <p className="quadra-form-erro">{erro}</p>}
        {quadra && (
          <QuadraForm
            initialData={quadra}
            submitLabel="Salvar Alterações"
            onSubmit={handleSubmit}
            onCancel={() => navigate('/quadras')}
          />
        )}
      </div>
    </div>
  )
}

export default EditarQuadra

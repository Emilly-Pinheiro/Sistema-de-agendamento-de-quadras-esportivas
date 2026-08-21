import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import QuadraForm from '../../components/QuadraForm/QuadraForm.jsx'
import { criarQuadra } from '../../services/quadraService.js'

function CadastrarQuadra() {
  const navigate = useNavigate()

  async function handleSubmit(formData) {
    await criarQuadra(formData)
    navigate('/quadras')
  }

  return (
    <div className="page">
      <Header />
      <div className="card">
        <h2>Cadastrar Quadra</h2>
        <QuadraForm
          submitLabel="Cadastrar Quadra"
          onSubmit={handleSubmit}
          onCancel={() => navigate('/quadras')}
        />
      </div>
    </div>
  )
}

export default CadastrarQuadra

import { Navigate, Routes, Route } from 'react-router-dom'
import GerenciarQuadras from '../pages/GerenciarQuadras/GerenciarQuadras.jsx'
import CadastrarQuadra from '../pages/CadastrarQuadra/CadastrarQuadra.jsx'
import EditarQuadra from '../pages/EditarQuadra/EditarQuadra.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/quadras" replace />} />
      <Route path="/quadras" element={<GerenciarQuadras />} />
      <Route path="/quadras/nova" element={<CadastrarQuadra />} />
      <Route path="/quadras/:id/editar" element={<EditarQuadra />} />
    </Routes>
  )
}

export default AppRoutes

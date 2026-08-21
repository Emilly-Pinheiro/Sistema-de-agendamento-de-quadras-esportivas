import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home.jsx'
import GerenciarQuadras from '../pages/GerenciarQuadras/GerenciarQuadras.jsx'
import CadastrarQuadra from '../pages/CadastrarQuadra/CadastrarQuadra.jsx'
import EditarQuadra from '../pages/EditarQuadra/EditarQuadra.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quadras" element={<GerenciarQuadras />} />
      <Route path="/quadras/nova" element={<CadastrarQuadra />} />
      <Route path="/quadras/:id/editar" element={<EditarQuadra />} />
    </Routes>
  )
}

export default AppRoutes

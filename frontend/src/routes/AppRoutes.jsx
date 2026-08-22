import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from '../pages/Landing/LandingPage.jsx';
import Login from '../pages/Login.jsx';
import Cadastro from '../pages/Cadastro.jsx';
import { Dashboard } from '../Dashboard.jsx';
import { ReservasList } from '../ReservasList.jsx';
import { NovaReserva } from '../NovaReserva.jsx';
import { EditarReserva } from '../EditarReserva.jsx';
import PlayersPage from '../pages/Players/PlayersPage.jsx';
import { QuadrasList } from '../QuadrasList.jsx';
import { NovaQuadra } from '../NovaQuadra.jsx';
import { EditarQuadra } from '../EditarQuadra.jsx';

function PlayersRoute() {
  const { pathname } = useLocation();
  return <PlayersPage pathname={pathname} />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reservas" element={<ReservasList />} />
      <Route path="/nova-reserva" element={<NovaReserva />} />
      <Route path="/editar-reserva/:id" element={<EditarReserva />} />
      <Route path="/jogadores/*" element={<PlayersRoute />} />
      <Route path="/quadras" element={<QuadrasList />} />
      <Route path="/nova-quadra" element={<NovaQuadra />} />
      <Route path="/editar-quadra/:id" element={<EditarQuadra />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;

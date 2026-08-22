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

function ProtectedRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/reservas" element={<ProtectedRoute><ReservasList /></ProtectedRoute>} />
      <Route path="/nova-reserva" element={<ProtectedRoute><NovaReserva /></ProtectedRoute>} />
      <Route path="/editar-reserva/:id" element={<ProtectedRoute><EditarReserva /></ProtectedRoute>} />
      <Route path="/jogadores/*" element={<ProtectedRoute><PlayersRoute /></ProtectedRoute>} />
      <Route path="/quadras" element={<ProtectedRoute><QuadrasList /></ProtectedRoute>} />
      <Route path="/nova-quadra" element={<ProtectedRoute><NovaQuadra /></ProtectedRoute>} />
      <Route path="/editar-quadra/:id" element={<ProtectedRoute><EditarQuadra /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;

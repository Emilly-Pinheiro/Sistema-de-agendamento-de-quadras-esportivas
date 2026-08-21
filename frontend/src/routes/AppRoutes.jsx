import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Cadastro from '../pages/Cadastro.jsx';
import { ReservasList } from '../ReservasList.jsx';
import { NovaReserva } from '../NovaReserva.jsx';
import { EditarReserva } from '../EditarReserva.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/reservas" element={<ReservasList />} />
      <Route path="/nova-reserva" element={<NovaReserva />} />
      <Route path="/editar-reserva/:id" element={<EditarReserva />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;

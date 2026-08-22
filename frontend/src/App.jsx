import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReservasList } from "./ReservasList";
import { NovaReserva } from "./NovaReserva";
import { EditarReserva } from "./EditarReserva";
import { QuadrasList } from "./QuadrasList";
import { NovaQuadra } from "./NovaQuadra";
import { EditarQuadra } from "./EditarQuadra";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReservasList />} />
        <Route path="/nova-reserva" element={<NovaReserva />} />
        <Route path="/editar-reserva/:id" element={<EditarReserva />} />
        <Route path="/quadras" element={<QuadrasList />} />
        <Route path="/nova-quadra" element={<NovaQuadra />} />
        <Route path="/editar-quadra/:id" element={<EditarQuadra />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
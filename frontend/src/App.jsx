import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReservasList } from "./ReservasList";
import { NovaReserva } from "./NovaReserva";
import { EditarReserva } from "./EditarReserva";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReservasList />} />
        <Route path="/nova-reserva" element={<NovaReserva />} />
        <Route path="/editar-reserva/:id" element={<EditarReserva />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
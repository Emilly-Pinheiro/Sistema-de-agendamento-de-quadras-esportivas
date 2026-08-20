import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReservasList } from "./ReservasList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReservasList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
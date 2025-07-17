import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductosPage from "./pages/ProductosPage";
import Inicio from "./pages/Inicio";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/productos" element={<ProductosPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

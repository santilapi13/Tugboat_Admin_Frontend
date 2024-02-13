import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Banderas from "./components/Banderas";
import Buques from "./components/Buques";
import Capitanes from "./components/Capitanes";
import Maniobras from "./components/Maniobras";
import Remolcadores from "./components/Remolcadores";
import Solicitantes from "./components/Solicitantes";
import Tripulantes from "./components/Tripulantes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/banderas" element={<Banderas />} />
        <Route path="/buques" element={<Buques />} />
        <Route path="/capitanes" element={<Capitanes />} />
        <Route path="/maniobras" element={<Maniobras />} />
        <Route path="/remolcadores" element={<Remolcadores />} />
        <Route path="/solicitantes" element={<Solicitantes />} />
        <Route path="/tripulantes" element={<Tripulantes />} />
      </Routes>
    </>
  );
}

export default App;

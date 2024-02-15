import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import ItemInsertion from "./components/ItemInsertion";
import PersonInsertion from "./components/PersonInsertion";
import endpoints from "./utils";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/banderas" element={<ItemInsertion endpoint={ endpoints.banderas } itemName="bandera"/>} />
        <Route path="/buques" element={<ItemInsertion endpoint={ endpoints.buques } itemName="buque"/>} />
        <Route path="/capitanes" element={<PersonInsertion endpoint={ endpoints.capitanes } personName="capitán"/>} />
        <Route path="/maniobras" element={<ItemInsertion endpoint={ endpoints.maniobras } itemName="maniobra"/>} />
        <Route path="/remolcadores" element={<ItemInsertion endpoint={ endpoints.remolcadores } itemName="remolcador"/>} />
        <Route path="/solicitantes" element={<ItemInsertion endpoint={ endpoints.solicitantes } itemName="solicitante"/>} />
        <Route path="/tripulantes" element={<PersonInsertion endpoint={ endpoints.tripulantes } personName="tripulante"/>} />
      </Routes>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Produits from './pages/Produits'
import Vente from './pages/Vente'
import EtatVente from './pages/EtatVente'
import InvoiceFacture from "./pages/InvoiceFacture";
import EtatCaisse from "./pages/EtatCaisse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/produits" element={<Produits/>} />
        <Route path="/vente" element={<Vente/>} />
        <Route path="/etat" element={<EtatVente />} />
        <Route path="/tempfacture" element={<InvoiceFacture />} />
        <Route path="/etatfacture" element={<EtatCaisse />} />
      </Routes>
    </Router>
  );
}

export default App;

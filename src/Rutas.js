import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrePagina from './componentes/PrePagina';
import Catalogo from './componentes/Catalogo/Catalogo';
import Wishlist from './componentes/Wishlist';
import Consolas from './componentes/extras/Consolas';
import QuienesSomos from './componentes/extras/QuienesSomos';
import Perfil from './componentes/Usuario/Perfil';
import Ayuda from './componentes/extras/Ayuda';
import LoginUsuario from './componentes/Usuario/LoginUsuario';
import RegistroUsuario from './componentes/Usuario/RegistroUsuario';

function Rutas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrePagina />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/consolas" element={<Consolas />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/usuario/login" element={<LoginUsuario />} />
        <Route path="/usuario/registro" element={<RegistroUsuario />} />
      </Routes>
    </Router>
  );
}

export default Rutas;

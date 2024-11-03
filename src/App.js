import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter
import './App.css';
import RegistroEmpresa from './componentes/Empresa/RegistroEmpresa';
import BusinessTab from './componentes/Empresa/BusinessTab';
import CreacionJuego from './componentes/Empresa/CreacionJuego'
import ModificacionVideojuego from './componentes/Empresa/ModificacionJuego';
import RegistroUsuario from './componentes/Usuario/RegistroUsuario';
import Consolas from './componentes/extras/Consolas'
import QuienesSomos from './componentes/extras/QuienesSomos'
import PrePagina from './componentes/PrePagina'
import Login from './componentes/Login'
import Ayuda from './componentes/extras/Ayuda';
import LoginUsuario from './componentes/Usuario/LoginUsuario';
import UserTabCliente from './componentes/Usuario/UserTab';
import NuevaContraseña from './componentes/Usuario/recuperoContraseña/NuevaContraseña';
import RecuperarContraseña from './componentes/Usuario/recuperoContraseña/RecuperarContraseña';
import VerificaciónID from './componentes/Usuario/recuperoContraseña/VerificaciónID';




function App() {
  return (
    <Router>
      <div className="App">
        <LoginUsuario />
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import './App.css';
import RegistroEmpresa from './componentes/Empresa/RegistroEmpresa';
import BusinessTab from './componentes/Empresa/BusinessTab';
import CreacionJuego from './componentes/Empresa/CreacionJuego'
import ModificacionVideojuego from './componentes/Empresa/ModificacionJuego';
import RegistroUsuario from './componentes/Usuario/RegistroUsuario';
import Consolas from './componentes/extras/Consolas'
import QuienesSomos from './componentes/extras/QuienesSomos'
import PrePagina from './componentes/PrePagina'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <PrePagina/>
      </div>
    </BrowserRouter>
  );
}

export default App;
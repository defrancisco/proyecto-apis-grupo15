import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import './App.css';
import RegistroEmpresa from './componentes/Empresa/RegistroEmpresa';
import BusinessTab from './componentes/Empresa/BusinessTab';
import CreacionJuego from './componentes/Empresa/CreacionJuego'
import ModificacionVideojuego from './componentes/Empresa/ModificacionJuego';
import RegistroUsuario from './componentes/Usuario/RegistroUsuario';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <RegistroUsuario />
      </div>
    </BrowserRouter>
  );
}

export default App;
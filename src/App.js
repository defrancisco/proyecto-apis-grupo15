import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import './App.css';
import RegistroEmpresa from './componentes/Empresa/RegistroEmpresa';
import BusinessTab from './componentes/Empresa/BusinessTab';
import CreacionJuego from './componentes/Empresa/CreacionJuego'
import ModificacionVideojuego from './componentes/Empresa/ModificacionJuego';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ModificacionVideojuego />
      </div>
    </BrowserRouter>
  );
}

export default App;
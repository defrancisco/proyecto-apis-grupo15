import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import './App.css';
import RegistroEmpresa from './componentes/Empresa/RegistroEmpresa';
import BusinessTab from './componentes/Empresa/BusinessTab';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <BusinessTab />
      </div>
    </BrowserRouter>
  );
}

export default App;
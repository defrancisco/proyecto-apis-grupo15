import React from 'react';
import logo from './logo.svg';
import Catalogo from './componentes/Catalogo/Catalogo';

import './App.css';
import RegistroEmpresa from './componentes/Empresa/RegistroEmpresa';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>hi</p>
        
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

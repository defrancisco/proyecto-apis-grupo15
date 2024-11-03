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



// Imagenes
import logo from './componentes/imagenes/logo.png'; 
import shoppingcart from './componentes/imagenes/shoppingcart.jpg'; 
import animalcrossing from './componentes/imagenes/animalcrossing.jpg';
import mariokart from './componentes/imagenes/mariokart.jpg';
import zelda from './componentes/imagenes/zelda.jpg';
import zeldaEoW from './componentes/imagenes/zeldaEoW.png';
import baldursGate from './componentes/imagenes/baldursGate.jpg';
import pokemonScarlet from './componentes/imagenes/pokemonScarlet.png';
import pokemonViolet from './componentes/imagenes/pokemonViolet.png';
import rainbowSixSiege from './componentes/imagenes/rainbowSixSiege.jpg';
import redDeadRedemption2 from './componentes/imagenes/redDeadRedemption2.jpg';
import nintendoswitch from './componentes/imagenes/nintendoswitch.webp';
import nintendolite from './componentes/imagenes/nintendolite.jpg';
import nintendoswitcholed from './componentes/imagenes/nintendoswitcholed.jpg';
import profile from './componentes/imagenes/profile.png';


function App() {
  return (
    <Router>
      <div className="App">
        <RecuperarContraseña />
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/headeryfooter.css'; 
import logo from './imagenes/logo.png';
import shoppingcart from './imagenes/shoppingcart.jpg';

function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="container-left">
          <Link to="/preinicio" className="logo">
            <img src={logo} alt="Nintendo Logo" />
          </Link>

          <nav>
            <ul>
              <li><Link to="/preinicio">Inicio</Link></li>
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/consolas">Consolas</Link></li>
              <li><Link to="/quienes-somos">Quienes somos</Link></li>
              <li><Link to="/perfil">Perfil</Link></li>
              <li><Link to="/ayuda">Ayuda</Link></li>
            </ul>
          </nav>
        </div>

        <div className="auth-buttons">
          <Link to="/usuario/login">
            <button id="login-btn">Iniciar sesión</button>
          </Link>
          <Link to="/usuario/registro">
            <button id="register-btn">Registrarse</button>
          </Link>
          <Link to="/preinicio" className="logo">
            <img src={shoppingcart} alt="Cart Logo" />
          </Link>
        </div>
        
      </div>
    </header>
  );
}

export default Header;

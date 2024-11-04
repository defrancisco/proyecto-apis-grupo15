import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/headeryfooter.css'; 
import logo from './imagenes/logo.png';
import shoppingcart from './imagenes/shoppingcart.jpg';
import profile from './imagenes/profile.png';
import { useUser } from '../routes/root';

function Header() {
  const { userType } = useUser() || {}; // Manejo de undefined

  return (
    <header>
      <div className="header-container">
        <div className="container-left">
          <Link to="/prePagina" className="logo">
            <img src={logo} alt="Nintendo Logo" />
          </Link>

          <nav>
            <ul>
              <li><Link to="/prePagina">Inicio</Link></li>
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to={userType ? "/wishlist" : "/iniciarSesion/loginUsuario"}>
              Wishlist</Link></li>
              <li><Link to="/consolas">Consolas</Link></li>
              <li><Link to="/quienesSomos">Quienes somos</Link></li>
              <li><Link to="/ayuda">Ayuda</Link></li>
            </ul>
          </nav>
        </div>

        <div className="auth-buttons">
              {userType ? (
                <Link to={userType === 'business' ? '/empresa/bussinessTab' : '/usuario/UserTab'}>
                  <img src={profile} alt="Perfil" /> 
                </Link>
              ) : (
                <Link to="/usuario/login">
                  <button id="login-btn">Iniciar sesión</button>
                </Link>
              )}
          <Link to="/usuario/registro">
            <button id="register-btn">Registrarse</button>
          </Link>
          <Link to="/carritoCompra" className="logo">
            <img src={shoppingcart} alt="Cart Logo" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
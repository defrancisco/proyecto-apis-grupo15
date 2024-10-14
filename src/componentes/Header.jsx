import React from 'react';
import '../styles/headeryfooter.css'; 

function Header() {
    return (
      <header>
        <div className="header-container">
          <div className="container-left">
            <a href="PrePágina.html" className="logo">
              <img src="imagenes/logo.png" alt="Nintendo Logo" />
            </a>
            <nav>
              <ul>
                <li><a href="PrePágina.html">Inicio</a></li>
                <li><a href="Catálogo/Catalogo.html">Catálogo</a></li>
                <li><a href="InicioSesion.html">Wishlist</a></li>
                <li><a href="extras/Consolas.html">Consolas</a></li>
                <li><a href="extras/QuienesSomos.html">Quienes somos</a></li>
                <li><a href="InicioSesion.html">Perfil</a></li>
                <li><a href="extras/Ayuda.html">Ayuda</a></li>
              </ul>
            </nav>
          </div>
          <div className="auth-buttons">
            <a href="Usuario/IniciodeSasionUsuario.html">
              <button id="login-btn">Iniciar sesión</button>
            </a>
            <a href="Usuario/RegistroUsuario.html">
              <button id="register-btn">Registrarse</button>
            </a>
          </div>
        </div>
      </header>
    );
  }
  
  export default Header;

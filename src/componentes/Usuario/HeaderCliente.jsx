import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/headeryfooter';

export const HeaderCliente = () => {
  return (
    <header>
      <div className="header-container">
        <div className="container-left">
        <Link to="/preinicio" className="logo">
            <img src="imagenes/logo.png" alt="Nintendo Logo" />
          </Link>

        <nav>
          <ul>
              <li><Link to="/preinicio">Inicio</Link></li>
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/consolas">Consolas</Link></li>
              <li><Link to="/quienes-somos">Quienes somos</Link></li>
              <li><Link to="/ayuda">Ayuda</Link></li>
          </ul>
        </nav>
        </div>
        
        <div className="icons">
          <Link to="/business-tab">Perfil</Link>
          <img src="src\componentes\imagenes\profile.png" alt="Logo-Perfil" />
        </div>

        </div>
    </header>
  );
}

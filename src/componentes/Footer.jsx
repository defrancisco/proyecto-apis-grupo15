import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para manejar rutas de React Router
import '../styles/headeryfooter.css'; // Estilos del header y footer

function Footer() {
  return (
    <footer>
      <div className="footer-links">
        <ul>
          <li><a href="#web">Padres y control parental</a></li> {/* Ruta de sitio web */}
          <li><Link to="/ayuda">Ayuda</Link></li> 
          <li><a href="#web">Política de privacidad</a></li> {/* Ruta de sitio web */}
          <li><Link to="/ayuda">Eliminación del servicio</Link></li> 
          <li><a href="#web">RSC</a></li> {/* Ruta de sitio web */}
        </ul>
      </div>
      <div className="footer-info">
        <p>Nintendo. 2024</p>
        <ul>
          <li><a href="#web">Empleo</a></li> {/* Ruta de sitio web */}
          <li><Link to="/quienes-somos">Información de la empresa</Link></li> 
          <li><a href="#web">Cookies</a></li> {/* Ruta de sitio web */}
          <li><Link to="/ayuda">Contactar</Link></li> 
          <li><a href="#web">Información legal</a></li> {/* Ruta de sitio web */}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

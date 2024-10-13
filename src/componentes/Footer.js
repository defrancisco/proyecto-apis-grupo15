import React from 'react';
import '../styles/headeryfooter.css';

function Footer() {
  return (
    <footer>
      <div className="footer-links">
        <ul>
          <li><a href="#">Padres y control parental</a></li>
          <li><a href="#">Ayuda</a></li>
          <li><a href="#">Política de privacidad</a></li>
          <li><a href="#">Eliminación del servicio</a></li>
          <li><a href="#">RSC</a></li>
        </ul>
      </div>
      <div className="footer-info">
        <p>Nintendo. 2024</p>
        <ul>
          <li><a href="#">Empleo</a></li>
          <li><a href="#">Información de la empresa</a></li>
          <li><a href="#">Cookies</a></li>
          <li><a href="#">Contactar</a></li>
          <li><a href="#">Información legal</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
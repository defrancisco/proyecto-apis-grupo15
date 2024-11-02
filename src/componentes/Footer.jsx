import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/headeryfooter.css';
import ContactForm from './extras/ContactForm';
import instagramlogo from './imagenes/instagramlogo.jpg';
import twitter from './imagenes/twitter.jpg';
import youtube from './imagenes/youtube.jpg';

function Footer() {
  return (
    <footer>
      <div className="footer-links">
        <ul>
          <li><Link to="/ayuda">Padres y control parental</Link></li>
          <li><Link to="/ayuda">Ayuda</Link></li>
          <li><Link to="/ayuda">Eliminación del servicio</Link></li>
          <li><Link to="/quienesSomos">Información de la empresa</Link></li>
          <li><Link to="/contactar">Contactar</Link></li>
        </ul>
      </div>
      <div className="footer-social">
        <div className="social-links">
          <a href="https://twitter.com/NintendoES" target="_blank" rel="noopener noreferrer">
            <img src={twitter} alt="Twitter" />
          </a>
          <a href="https://www.instagram.com/nintendoes/" target="_blank" rel="noopener noreferrer">
            <img src={instagramlogo} alt="Instagram" />
          </a>
          <a href="https://www.youtube.com/user/Nintendo" target="_blank" rel="noopener noreferrer">
            <img src={youtube} alt="YouTube" />
          </a>
        </div>
      </div>
      <div className="footer-info">
        <p>Nintendo. 2024</p>
      </div>
    </footer>
  );
}

export default Footer;

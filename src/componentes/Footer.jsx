import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/headeryfooter.css';
import instagramlogo from './imagenes/instagramlogo.jpg';
import twitter from './imagenes/twitter.jpg';
import youtube from './imagenes/youtube.jpg';

function Footer() {
  const [socialLinks, setSocialLinks] = useState({
    twitterURL: '',
    instagramURL: '',
    youtubeURL: ''
  });

  useEffect(() => {
    // Obtener URLs desde el backend
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch('/social/twitter');
        const twitterData = await response.json();
        setSocialLinks((prevState) => ({
          ...prevState,
          twitterURL: twitterData.twitterURL
        }));

        const instagramResponse = await fetch('/social/instagram');
        const instagramData = await instagramResponse.json();
        setSocialLinks((prevState) => ({
          ...prevState,
          instagramURL: instagramData.instagramURL
        }));

        const youtubeResponse = await fetch('/social/youtube');
        const youtubeData = await youtubeResponse.json();
        setSocialLinks((prevState) => ({
          ...prevState,
          youtubeURL: youtubeData.youtubeURL
        }));
      } catch (error) {
        console.error('Error al obtener las URLs de redes sociales:', error);
      }
    };

    fetchSocialLinks();
  }, []);

  return (
    <footer>
      <div className="footer-links">
        <ul>
          <li><Link to="/ayuda">Padres y control parental</Link></li>
          <li><Link to="/ayuda">Ayuda</Link></li>
          <li><Link to="/ayuda">Eliminación del servicio</Link></li>
          <li><Link to="/quienesSomos">Información de la empresa</Link></li>
          <li><Link to="/contacto">Contactar</Link></li>
        </ul>
      </div>
      <div className="footer-social">
        <div className="social-links">
          {socialLinks.twitterURL && (
            <a href={socialLinks.twitterURL} target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="Twitter" />
            </a>
          )}
          {socialLinks.instagramURL && (
            <a href={socialLinks.instagramURL} target="_blank" rel="noopener noreferrer">
              <img src={instagramlogo} alt="Instagram" />
            </a>
          )}
          {socialLinks.youtubeURL && (
            <a href={socialLinks.youtubeURL} target="_blank" rel="noopener noreferrer">
              <img src={youtube} alt="YouTube" />
            </a>
          )}
        </div>
      </div>
      <div className="footer-info">
        <p>Nintendo. 2024</p>
      </div>
    </footer>
  );
}

export default Footer;

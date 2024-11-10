import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/userTab.css';

function BusinessTab() {
  const [activeSection, setActiveSection] = useState('perfil');
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // "despublicar" o "eliminar"

  useEffect(() => {
    const sectionId = window.location.hash.substring(1);
    if (sectionId) {
      setActiveSection(sectionId);
    }
  }, []);

  const showSection = (section) => {
    setActiveSection(section);
    window.location.hash = section;
  };

  // Pop ups de confirmación
  const handleDeleteOrArchive = (action) => {
    setConfirmAction(action);
    setShowConfirmPopup(true);
  };

  const confirmActionHandler = () => {
    if (confirmAction === "eliminar") {
      // Lógica para eliminar el juego
      console.log("Juego eliminado");
    } else if (confirmAction === "despublicar") {
      // Lógica para despublicar el juego
      console.log("Juego despublicado");
    }
    setShowConfirmPopup(false);
    setConfirmAction(null);
  };

  return (
    <div className="business-tab-container">
      <div className="sidebar">
        <h2>Mi Perfil</h2>
        <nav className="sidebar-nav">
          <button onClick={() => showSection('perfil')} 
                  className={activeSection === 'perfil' ? 'active' : ''}>
            Perfil
          </button>
          <button onClick={() => showSection('autenticacion')} 
                  className={activeSection === 'autenticacion' ? 'active' : ''}>
            Autenticación
          </button>
          <button onClick={() => showSection('analisis')} 
                  className={activeSection === 'analisis' ? 'active' : ''}>
            Análisis de Videojuegos
          </button>
          <button onClick={() => showSection('misJuegos')} 
                  className={activeSection === 'misJuegos' ? 'active' : ''}>
            Mis juegos
          </button>
          <button>Salir</button>
        </nav>
      </div>

      <div className="main-content">
        {/* Sección Perfil */}
        <div className={`section ${activeSection === 'perfil' ? 'active' : ''}`}>
          <div className="content-card">
            <h2>Mis datos</h2>
            <div className="form-container">
              <div className="form-group">
                <label>Mail</label>
                <input 
                  type="email" 
                  placeholder="Mail" 
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Nombre de empresa</label>
                <input 
                  type="text" 
                  placeholder="Nombre de empresa" 
                  className="form-input"
                />
              </div>
              <button className="action-button">Actualizar datos</button>
            </div>
          </div>
        </div>

        {/* Sección Autenticación */}
        <div className={`section ${activeSection === 'autenticacion' ? 'active' : ''}`}>
          <div className="content-card">
            <h2>Cambio de Contraseña</h2>
            <div className="form-container">
              <div className="form-group">
                <label>Contraseña Actual</label>
                <input type="password" placeholder="Contraseña" />
              </div>
              <div className="form-group">
                <label>Nueva Contraseña</label>
                <input type="password" placeholder="Contraseña" />
              </div>
              <div className="form-group">
                <label>Repetir Nueva Contraseña</label>
                <input type="password" placeholder="Contraseña" />
              </div>
              <button className="action-button">Confirmar Contraseña</button>
            </div>
          </div>
        </div>

        {/* Sección Análisis */}
        <div className={`section ${activeSection === 'analisis' ? 'active' : ''}`}>
          <div className="content-card">
            <h2>Análisis de Videojuegos</h2>
            <div className="game-analysis">
              <img src="/placeholder.svg?height=100&width=100" alt="Juego 1" />
              <div className="game-info-1">
                <h3>Nombre del juego</h3>
                <p>Visualizaciones: 1</p>
                <p>Compras: 1</p>
                <p>Deseados: 1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Mis Juegos */}
        <div className={`section ${activeSection === 'misJuegos' ? 'active' : ''}`}>
          <div className="content-card">
            <h2>Mis juegos</h2>
            <div className="search-bar">
              <input type="text" placeholder="Nombre del Juego" />
              <button>Buscar</button>
            </div>
            <button>
              <Link to="/businessTab/creacionVideojuego">Crear Juego</Link>
            </button>
            <ul className="game-list">
              <li>
                <h3>Nombre del Juego</h3>
                <button onClick={() => handleDeleteOrArchive("despublicar")}>Despublicar</button>
                <button onClick={() => handleDeleteOrArchive("eliminar")}>Eliminar</button>
              </li>
              <li>
                <h3>Nombre del Juego</h3>
                <button onClick={() => handleDeleteOrArchive("despublicar")}>Despublicar</button>
                <button onClick={() => handleDeleteOrArchive("eliminar")}>Eliminar</button>
              </li>
              <li>
                <h3>Nombre del Juego</h3>
                <button onClick={() => handleDeleteOrArchive("despublicar")}>Despublicar</button>
                <button onClick={() => handleDeleteOrArchive("eliminar")}>Eliminar</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Popup de confirmación */}
      {showConfirmPopup && (
        <div className="confirm-popup">
          <div className="confirm-popup-content">
            <h3>Atención</h3>
            <p>¿Estás seguro que quiere {confirmAction === "eliminar" ? "eliminar" : "despublicar"} este juego?</p>
            <button onClick={confirmActionHandler}>Sí</button>
            <button onClick={() => setShowConfirmPopup(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusinessTab;
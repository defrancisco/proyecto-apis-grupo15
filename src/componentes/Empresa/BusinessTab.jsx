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
    <div className="flex flex-col min-h-screen">
      <main>
        <div className="sidebar">
          <h2>Mi Perfil</h2>
          <button onClick={() => showSection('perfil')} className={activeSection === 'perfil' ? 'active' : ''}>Perfil</button>
          <button onClick={() => showSection('autenticacion')} className={activeSection === 'autenticacion' ? 'active' : ''}>Autenticación</button>
          <button onClick={() => showSection('analisis')} className={activeSection === 'analisis' ? 'active' : ''}>Análisis de Videojuegos</button>
          <button onClick={() => showSection('misJuegos')} className={activeSection === 'misJuegos' ? 'active' : ''}>Mis juegos</button>
          <button>Salir</button>
        </div>

        <div className="content">
          <div id="perfil" className={`section ${activeSection === 'perfil' ? 'active' : ''}`}>
            <h2>Mis datos</h2>
            <form>
              <label htmlFor="mail">Mail:</label>
              <input type="email" id="mail" name="mail" placeholder="Mail" />
              
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" placeholder="Nombre" />
              
              <label htmlFor="apellido">Apellido:</label>
              <input type="text" id="apellido" name="apellido" placeholder="Apellido" />
              
              <label htmlFor="fecha_nacimiento">Fecha nacimiento:</label>
              <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" />
              
              <button type="submit">Actualizar datos</button>
            </form>
          </div>

          <div id="autenticacion" className={`section ${activeSection === 'autenticacion' ? 'active' : ''}`}>
            <h2>Cambio de Contraseña</h2>
            <form>
              <label htmlFor="password_actual">Contraseña Actual:</label>
              <input type="password" id="password_actual" name="password_actual" placeholder="Contraseña" />
              
              <label htmlFor="nueva_password">Nueva Contraseña:</label>
              <input type="password" id="nueva_password" name="nueva_password" placeholder="Contraseña" />
              
              <label htmlFor="repetir_nueva_password">Repetir Nueva Contraseña:</label>
              <input type="password" id="repetir_nueva_password" name="repetir_nueva_password" placeholder="Contraseña" />
              
              <button type="submit">Confirmar Contraseña</button>
            </form>
          </div>

          <div id="analisis" className={`section ${activeSection === 'analisis' ? 'active' : ''}`}>
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

          <div id="misJuegos" className={`section ${activeSection === 'misJuegos' ? 'active' : ''}`}>
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
            </ul>
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
      </main>
    </div>
  );
}

export default BusinessTab;
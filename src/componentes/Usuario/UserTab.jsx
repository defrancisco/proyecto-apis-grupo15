import React, { useState, useEffect } from 'react';
import '../../styles/headeryfooter.css';
import '../../styles/userTab.css';
import Header from '../Header';
import Footer from '../Footer';

// Sidebar Component
const Sidebar = ({ showSection }) => {
  return (
    <div className="sidebar">
      <h2>Mi Cuenta</h2>
      <button onClick={() => showSection('perfil')}>Perfil</button>
      <button onClick={() => showSection('autenticacion')}>Autenticación</button>
      <button onClick={() => showSection('wishlist')}>My Wishlist</button>
      <button onClick={() => showSection('mediosPago')}>Medios de Pago</button>
      <button>Salir</button>
    </div>
  );
};

// Perfil Component
const Perfil = () => {
  return (
    <div className="section">
      <h2>Mis Datos</h2>
      <form>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" placeholder="Nombre Actual" /><br />

        <label htmlFor="apellido">Apellido:</label>
        <input type="text" id="apellido" name="apellido" placeholder="Apellido Actual" /><br />

        <label htmlFor="mail">Mail:</label>
        <input type="email" id="mail" name="mail" placeholder="correo actual.com" /><br />

        <label htmlFor="fecha_nacimiento">Fecha de nacimiento:</label>
        <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" placeholder="2000-01-01" /><br />

        <button type="submit">Actualizar Datos</button>
      </form>
    </div>
  );
};

// Autenticacion Component
const Autenticacion = () => {
  return (
    <div className="section">
      <h2>Cambio de Contraseña</h2>
      <form>
        <label htmlFor="password_actual">Contraseña Actual:</label>
        <input type="password" id="password_actual" name="password_actual" /><br />

        <label htmlFor="nueva_password">Nueva Contraseña:</label>
        <input type="password" id="nueva_password" name="nueva_password" /><br />

        <label htmlFor="repetir_nueva_password">Repetir Nueva Contraseña:</label>
        <input type="password" id="repetir_nueva_password" name="repetir_nueva_password" /><br />

        <button type="submit">Confirmar Contraseña</button>
      </form>
    </div>
  );
};

// Wishlist Component
const Wishlist = () => {
  return (
    <div className="section">
      <h2>My Wishlist</h2>
      <div className="wishlist-item">
        <img src="" alt="Juego 1" />
        <div>
          <p>Nombre Del Juego 1</p>
          <p>Precio: $59.99</p>
          <button>Agregar al carrito</button>
        </div>
      </div>
      <div className="wishlist-item">
        <img src="" alt="Juego 2" />
        <div>
          <p>Nombre Del Juego 2</p>
          <p>Precio: $49.99</p>
          <button>Agregar al carrito</button>
        </div>
      </div>
      <div className="wishlist-item">
        <img src="" alt="Juego 3" />
        <div>
          <p>Nombre Del Juego 3</p>
          <p>Precio: $39.99</p>
          <button>Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

// MediosPago Component
const MediosPago = () => {
  return (
    <div className="section">
      <h2>Métodos de Pago</h2>
      <form>
        <label htmlFor="card-number">Número de Tarjeta:</label>
        <input type="text" id="card-number" name="card-number" placeholder="1234 5678 9012 3456" /><br />

        <label htmlFor="cardholder-name">Nombre del Titular:</label>
        <input type="text" id="cardholder-name" name="cardholder-name" placeholder="Nombre Apellido" /><br />

        <label htmlFor="expiry-date">Fecha de vencimiento:</label>
        <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YY" /><br />

        <label htmlFor="security-code">Código de Seguridad:</label>
        <input type="password" id="security-code" name="security-code" placeholder="123" /><br />

        <button type="submit">Actualizar datos</button>
      </form>
    </div>
  );
};

// Main UserTab Component
const UserTab = () => {
  const [section, setSection] = useState('perfil');

  const showSection = (section) => {
    setSection(section);
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1); // Remueve el '#'
    if (hash) {
      setSection(hash);
    }
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Sidebar showSection={showSection} />
        <div className="content">
          {section === 'perfil' && <Perfil />}
          {section === 'autenticacion' && <Autenticacion />}
          {section === 'wishlist' && <Wishlist />}
          {section === 'mediosPago' && <MediosPago />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserTab;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/headeryfooter.css';
import '../../styles/userTab.css';

import Header from '../Header';
import Footer from '../Footer';

// Componente Sidebar
const Sidebar = ({ showSection }) => {
  const navigate = useNavigate();  // Hook para la redirección
  const handleLogout = () => {
    // Acá limpio los datos de sesión si es necesario
    navigate('/PrePagina');  // Redirige a la página de preinicio
  };

  return (
    <div className="sidebar"> 
      <h2>Mi Cuenta</h2> 
      {/* Botones que permiten cambiar la sección activa mediante la función showSection */}
      <button onClick={() => showSection('perfil')}>Perfil</button>
      <button onClick={() => showSection('autenticacion')}>Autenticación</button>
      <button onClick={() => showSection('wishlist')}>My Wishlist</button>
      <button onClick={() => showSection('mediosPago')}>Medios de Pago</button>
      <button onClick={handleLogout}>Salir</button> {/* Botón de salir con redirección */}
    </div>
  );
};

// Componente Perfil
const Perfil = () => {
  return (
    <div className="section"> {/* Contenedor de la sección de perfil */}
      <h2>Mis Datos</h2> {/* Título de la sección de datos */}
      <form>
        {/* Campos para actualizar datos del usuario */}
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" placeholder="Nombre Actual" required /><br />

        <label htmlFor="apellido">Apellido:</label>
        <input type="text" id="apellido" name="apellido" placeholder="Apellido Actual" required /><br />

        <label htmlFor="mail">Mail:</label>
        <input type="email" id="mail" name="mail" placeholder="ejemplo@correo.com" required /><br />

        <label htmlFor="fecha_nacimiento">Fecha de nacimiento:</label>
        <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" required /><br />

        <button type="submit">Actualizar Datos</button> {/* Botón para enviar el formulario */}
      </form>
    </div>
  );
};

// Componente Autenticación
const Autenticacion = () => {
  return (
    <div className="section"> {/* Contenedor de la sección de autenticación */}
      <h2>Cambio de Contraseña</h2> {/* Título de la sección */}
      <form>
        {/* Campos para cambio de contraseña */}
        <label htmlFor="password_actual">Contraseña Actual:</label>
        <input type="password" id="password_actual" name="password_actual" required /><br />

        <label htmlFor="nueva_password">Nueva Contraseña:</label>
        <input type="password" id="nueva_password" name="nueva_password" required /><br />

        <label htmlFor="repetir_nueva_password">Repetir Nueva Contraseña:</label>
        <input type="password" id="repetir_nueva_password" name="repetir_nueva_password" required /><br />

        <button type="submit">Confirmar Contraseña</button> {/* Botón para enviar el formulario */}
      </form>
    </div>
  );
};

// Componente Wishlist
const Wishlist = () => {
  return (
    <div className="section"> {/* Contenedor de la sección de wishlist */}
      <h2>My Wishlist</h2> {/* Título de la sección */}
      {/* Ejemplo de items en la wishlist */}
      <div className="wishlist-item">
        <img src="ruta/juego1.jpg" alt="Juego 1" /> {/* Imagen del juego */}
        <div>
          <p>Nombre Del Juego 1</p> {/* Nombre del juego */}
          <p>Precio: $59.99</p> {/* Precio del juego */}
          <button>Agregar al carrito</button> {/* Botón para agregar al carrito */}
        </div>
      </div>
      {/* Repetir para otros juegos en la wishlist */}
      <div className="wishlist-item">
        <img src="ruta/juego2.jpg" alt="Juego 2" />
        <div>
          <p>Nombre Del Juego 2</p>
          <p>Precio: $49.99</p>
          <button>Agregar al carrito</button>
        </div>
      </div>
      <div className="wishlist-item">
        <img src="ruta/juego3.jpg" alt="Juego 3" />
        <div>
          <p>Nombre Del Juego 3</p>
          <p>Precio: $39.99</p>
          <button>Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

// Componente MediosPago
const MediosPago = () => {
  return (
    <div className="section"> {/* Contenedor de la sección de métodos de pago */}
      <h2>Métodos de Pago</h2> {/* Título de la sección */}
      <form>
        {/* Campos para ingresar detalles de la tarjeta */}
        <label htmlFor="card-number">Número de Tarjeta:</label>
        <input type="text" id="card-number" name="card-number" placeholder="1234 5678 9012 3456" required /><br />

        <label htmlFor="cardholder-name">Nombre del Titular:</label>
        <input type="text" id="cardholder-name" name="cardholder-name" placeholder="Nombre Apellido" required /><br />

        <label htmlFor="expiry-date">Fecha de vencimiento:</label>
        <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YY" required /><br />

        <label htmlFor="security-code">Código de Seguridad:</label>
        <input type="password" id="security-code" name="security-code" placeholder="123" required /><br />

        <button type="submit">Actualizar datos</button> {/* Botón para enviar el formulario */}
      </form>
    </div>
  );
};

// Componente principal UserTab
const UserTab = () => {
  const [section, setSection] = useState('perfil'); // Estado para la sección activa, comenzamos con 'perfil'

  // Función para cambiar la sección activa
  const showSection = (section) => {
    setSection(section); // Actualiza el estado a la sección seleccionada
  };

  // useEffect para leer el hash de la URL al cargar el componente
  useEffect(() => {
    const hash = window.location.hash.substring(1); // Remueve el '#' del hash de la URL
    if (hash) {
      setSection(hash); // Cambia la sección si hay un hash en la URL
    }
  }, []);

  return (
    <div>
      <Header /> {/* Renderiza el componente Header */}
      <main>
        <Sidebar showSection={showSection} /> {/* Renderiza la barra lateral y le pasa la función para cambiar de sección */}
        <div className="content">
          {/* Renderiza la sección activa basada en el estado */}
          {section === 'perfil' && <Perfil />} 
          {section === 'autenticacion' && <Autenticacion />} 
          {section === 'wishlist' && <Wishlist />} 
          {section === 'mediosPago' && <MediosPago />} 
        </div>
      </main>
      <Footer /> {/* Renderiza el componente Footer */}
    </div>
  );
};

// Exportamos el componente UserTab para poder utilizarlo en otras partes de la aplicación
export default UserTab;

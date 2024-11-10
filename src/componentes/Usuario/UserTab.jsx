import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/userTab.css';

function UserTab() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('perfil');
  const [profileData, setProfileData] = useState({
    email: '',
    name: '',
    lastName: '',
    birthDate: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const sectionId = window.location.hash.substring(1);
    if (sectionId) {
      setActiveSection(sectionId);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Datos recibidos:', data);
          setProfileData({
            email: data.email,
            name: data.name,
            lastName: data.surname,
            birthDate: data.dateOfBirth || ''
          });
        }
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const userData = {
        email: profileData.email,
        name: profileData.name,
        surname: profileData.lastName,
        dateOfBirth: profileData.birthDate
      };

      console.log('Datos a enviar:', userData);

      const response = await fetch('http://localhost:3000/api/users/profile/individual', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el perfil');
      }

      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el perfil: ' + error.message);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert('Las contraseñas nuevas no coinciden');
        return;
      }

      const response = await fetch('http://localhost:3000/api/users/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cambiar la contraseña');
      }

      alert('Contraseña actualizada exitosamente');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      alert('Error al cambiar la contraseña: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/prePagina');
  };

  const showSection = (section) => {
    setActiveSection(section);
    window.location.hash = section;
  };

  return (
    <div className="business-tab-container">
      <div className="sidebar">
        <h2>Mi Cuenta</h2>
        <nav className="sidebar-nav">
          <button onClick={() => showSection('perfil')} 
                  className={activeSection === 'perfil' ? 'active' : ''}>
            Perfil
          </button>
          <button onClick={() => showSection('autenticacion')} 
                  className={activeSection === 'autenticacion' ? 'active' : ''}>
            Autenticación
          </button>
          <button onClick={() => showSection('wishlist')} 
                  className={activeSection === 'wishlist' ? 'active' : ''}>
            My Wishlist
          </button>
          <button onClick={() => showSection('mediosPago')} 
                  className={activeSection === 'mediosPago' ? 'active' : ''}>
            Medios de Pago
          </button>
          <button onClick={handleLogout}>Salir</button>
        </nav>
      </div>

      <div className="main-content">
        {/* Sección Perfil */}
        <div className={`section ${activeSection === 'perfil' ? 'active' : ''}`}>
          <div className="content-card">
            <h2>Mis datos</h2>
            <div className="form-container">
              <div className="form-group">
                <label>Nombre</label>
                <input 
                  type="text" 
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Fecha de nacimiento</label>
                <input 
                  type="date" 
                  name="birthDate"
                  value={profileData.birthDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <button className="action-button" onClick={handleUpdateProfile}>
                Actualizar datos
              </button>
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
                <input 
                  type="password" 
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Nueva Contraseña</label>
                <input 
                  type="password" 
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Repetir Nueva Contraseña</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="form-input"
                />
              </div>
              <button className="action-button" onClick={handleUpdatePassword}>
                Confirmar Contraseña
              </button>
            </div>
          </div>
        </div>

        {/* Sección Wishlist */}
        <div className={`section ${activeSection === 'wishlist' ? 'active' : ''}`}>
          <div className="content-card">
            <h2>My Wishlist</h2>
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
        </div>

        {/* Sección MediosPago */}
        <div className={`section ${activeSection === 'mediosPago' ? 'active' : ''}`}>
          <div className="content-card">
            <h2>Métodos de Pago</h2>
            <div className="form-container">
              <div className="form-group">
                <label>Número de Tarjeta</label>
                <input 
                  type="text" 
                  name="card-number"
                  placeholder="1234 5678 9012 3456"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Nombre del Titular</label>
                <input 
                  type="text" 
                  name="cardholder-name"
                  placeholder="Nombre Apellido"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Fecha de vencimiento</label>
                <input 
                  type="text" 
                  name="expiry-date"
                  placeholder="MM/YY"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Código de Seguridad</label>
                <input 
                  type="password" 
                  name="security-code"
                  placeholder="123"
                  className="form-input"
                />
              </div>
              <button className="action-button">
                Actualizar datos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserTab;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/userTab.css';

function BusinessTab() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('perfil');
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // "despublicar" o "eliminar"
  const [profileData, setProfileData] = useState({
    email: '',
    businessName: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [games, setGames] = useState([]);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const sectionId = window.location.hash.substring(1);
    if (sectionId) {
      setActiveSection(sectionId);
    }
  }, []);

  useEffect(() => {
    // Cargar datos del perfil al montar el componente
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/profile/business', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setProfileData({
            email: data.email,
            businessName: data.businessName
          });
        }
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:3000/api/business/games', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Error al obtener los juegos');
        }
        
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Error al cargar los juegos:', error);
      }
    };

    if (activeSection === 'misJuegos') {
      fetchGames();
    }
  }, [activeSection]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/business/games/analytics', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Error al obtener analytics');
        }
        
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Error al cargar analytics:', error);
      }
    };

    if (activeSection === 'analisis') {
      fetchAnalytics();
    }
  }, [activeSection]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showSection = (section) => {
    setActiveSection(section);
    window.location.hash = section;
  };

  // Pop ups de confirmación
  const handleDeleteOrArchive = (action, gameId) => {
    setConfirmAction({ type: action, gameId });
    setShowConfirmPopup(true);
  };

  const confirmActionHandler = async () => {
    if (confirmAction.type === "eliminar") {
      try {
        const response = await fetch(`http://localhost:3000/api/business/games/${confirmAction.gameId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el juego');
        }

        // Actualizar el estado local eliminando el juego
        setGames(games.filter(game => game.id !== confirmAction.gameId));
        alert('Juego eliminado exitosamente');
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    }
    setShowConfirmPopup(false);
    setConfirmAction(null);
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/profile/business', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          email: profileData.email,
          businessName: profileData.businessName
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el perfil');
      }

      const data = await response.json();
      alert('Perfil actualizado exitosamente');
      
      // Actualizar el estado con los datos actualizados
      setProfileData({
        email: data.user.email,
        businessName: data.user.businessName
      });
    } catch (error) {
      console.error('Error completo:', error);
      alert('Error al actualizar el perfil: ' + error.message);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdatePassword = async () => {
    try {
      // Validaciones del frontend
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        alert('Por favor complete todos los campos');
        return;
      }

      if (passwordData.newPassword.length < 8) {
        alert('La nueva contraseña debe tener al menos 8 caracteres');
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert('Las contraseñas nuevas no coinciden');
        return;
      }

      if (passwordData.currentPassword === passwordData.newPassword) {
        alert('La nueva contraseña debe ser diferente a la actual');
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al cambiar la contraseña');
      }

      alert('Contraseña actualizada exitosamente');
      
      // Limpiar los campos después de un cambio exitoso
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      alert(error.message || 'Error al cambiar la contraseña');
    }
  };

  const handlePublishUnpublish = async (gameId, isPublished) => {
    try {
      const action = isPublished ? 'unpublish' : 'publish';
      const response = await fetch(`http://localhost:3000/api/business/games/${gameId}/${action}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error al ${isPublished ? 'despublicar' : 'publicar'} el juego`);
      }

      // Actualizar el estado local de los juegos
      setGames(games.map(game => {
        if (game.id === gameId) {
          return { ...game, isPublished: !isPublished };
        }
        return game;
      }));

    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/prePagina');
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
                <label>Mail</label>
                <input 
                  type="email" 
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Nombre de empresa</label>
                <input 
                  type="text" 
                  name="businessName"
                  value={profileData.businessName}
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
                  placeholder="Contraseña actual" 
                />
              </div>
              <div className="form-group">
                <label>Nueva Contraseña</label>
                <input 
                  type="password" 
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nueva contraseña" 
                />
              </div>
              <div className="form-group">
                <label>Repetir Nueva Contraseña</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirmar nueva contraseña" 
                />
              </div>
              <button className="action-button" onClick={handleUpdatePassword}>
                Confirmar Contraseña
              </button>
            </div>
          </div>
        </div>

        {/* Sección Análisis */}
        <div className={`section ${activeSection === 'analisis' ? 'active' : ''}`}>
          <div className="content-card">
            <h2>Análisis de Videojuegos</h2>
            <div className="analytics-container">
              {analytics.map(game => (
                <div key={game.id} className="game-analysis">
                  <img 
                    src={`http://localhost:3000/api/games/${game.id}/image`} 
                    alt={game.name} 
                    style={{width: '100px', height: '100px', objectFit: 'cover'}}
                  />
                  <div className="game-info">
                    <h3>{game.name}</h3>
                    <div className="stats">
                      <div className="stat-item">
                        <span className="stat-label">Visualizaciones:</span>
                        <span className="stat-value">{game.views}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Compras:</span>
                        <span className="stat-value">{game.purchases}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Lista de deseos:</span>
                        <span className="stat-value">{game.wishlistCount}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Tasa de conversión:</span>
                        <span className="stat-value">
                          {game.views > 0 ? ((game.purchases / game.views) * 100).toFixed(2) : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
            <div className="games-list">
              {games.map(game => (
                <div key={game.id} className="game-item">
                  <div className="game-info">
                    <img 
                      src={`http://localhost:3000/api/games/${game.id}/image`} 
                      alt={game.name}
                      style={{width: '100px', height: '100px', objectFit: 'cover'}}
                    />
                    <h3>{game.name}</h3>
                    <p>Precio: ${game.price}</p>
                    <p>Estado: {game.isPublished ? 'Publicado' : 'No publicado'}</p>
                  </div>
                  <div className="game-actions">
                    <Link to={`/businessTab/modificacionJuego/${game.id}`}>
                      <button>Editar</button>
                    </Link>
                    <button onClick={() => handlePublishUnpublish(game.id, game.isPublished)}>
                      {game.isPublished ? 'Despublicar' : 'Publicar'}
                    </button>
                    <button onClick={() => handleDeleteOrArchive("eliminar", game.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popup de confirmación */}
      {showConfirmPopup && (
        <div className="confirm-popup">
          <div className="confirm-popup-content">
            <h3>¿Estás seguro?</h3>
            <p>¿Deseas eliminar este juego?</p>
            <div className="confirm-popup-buttons">
              <button onClick={confirmActionHandler}>Sí, eliminar</button>
              <button onClick={() => setShowConfirmPopup(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusinessTab;
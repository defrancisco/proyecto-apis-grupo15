import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import '../../styles/gameForm.css';

function ModificacionVideojuego() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    idioma: '',
    descripcion: '',
    reqMinimos: '',
    reqRecomendados: '',
    imagen: null,
    sistemaOperativo: ''
  });

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/business/games/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener datos del juego');
        }

        const data = await response.json();
        console.log('Sistema Operativo recibido:', data.operatingSystem);
        console.log('Datos completos recibidos:', data);
        
        setGameData({
          nombre: data.name,
          categoria: data.categories,
          precio: data.price,
          idioma: data.languages,
          descripcion: data.description,
          reqMinimos: data.minRequirements,
          reqRecomendados: data.recommendedRequirements,
          imagen: null,
          sistemaOperativo: data.operatingSystem
        });
      } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los datos del juego');
      }
    };

    if (id) {
      fetchGameData();
    }
  }, [id]);

  useEffect(() => {
    console.log('Estado actual del juego:', gameData);
  }, [gameData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGameData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setGameData(prevData => ({
      ...prevData,
      imagen: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    
    form.append('name', gameData.nombre);
    form.append('category', gameData.categoria);
    form.append('price', gameData.precio);
    form.append('description', gameData.descripcion);
    form.append('operatingSystem', gameData.sistemaOperativo);
    form.append('language', gameData.idioma);
    form.append('minRequirements', gameData.reqMinimos);
    form.append('recommendedRequirements', gameData.reqRecomendados);
    
    if (gameData.imagen) {
      form.append('imagen', gameData.imagen);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/business/games/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: form
      });

      if (response.ok) {
        alert('Juego actualizado exitosamente');
        navigate('/businessTab#misJuegos');
      } else {
        const error = await response.json();
        alert(`Error al actualizar el juego: ${error.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el juego');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="game-modification-container">
        <h2 className="modification-title">Modificación de Videojuego</h2>
        <div className="game-edit-layout">
          <div className="game-image-section">
            <img 
              src={`http://localhost:3000/api/games/${id}/image`} 
              alt="Imagen del juego" 
              className="game-preview-image"
            />
            <p className="last-modified">Última modificación: {new Date().toLocaleDateString()}</p>
          </div>
          <form className="game-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={gameData.nombre}
                onChange={handleInputChange}
                placeholder="Nombre del juego"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="categoria">Categoría</label>
                <input
                  type="text"
                  id="categoria"
                  name="categoria"
                  value={gameData.categoria}
                  onChange={handleInputChange}
                  placeholder="Categoría del juego"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input
                  type="text"
                  id="precio"
                  name="precio"
                  value={gameData.precio}
                  onChange={handleInputChange}
                  placeholder="Precio del juego"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="idioma">Idioma</label>
                <input
                  type="text"
                  id="idioma"
                  name="idioma"
                  value={gameData.idioma}
                  onChange={handleInputChange}
                  placeholder="Idioma del juego"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="sistemaOperativo">Sistema Operativo</label>
                <input
                  type="text"
                  id="sistemaOperativo"
                  name="sistemaOperativo"
                  value={gameData.sistemaOperativo}
                  onChange={handleInputChange}
                  placeholder="Sistema Operativo del juego"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción del Juego</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={gameData.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="reqMinimos">Requerimientos mínimos del sistema</label>
              <textarea
                id="reqMinimos"
                name="reqMinimos"
                value={gameData.reqMinimos}
                onChange={handleInputChange}
                placeholder="Especificar"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="reqRecomendados">Requerimientos recomendados del sistema</label>
              <textarea
                id="reqRecomendados"
                name="reqRecomendados"
                value={gameData.reqRecomendados}
                onChange={handleInputChange}
                placeholder="Especificar"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="imagen">Imagen del Juego (opcional)</label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-submit">Guardar cambios</button>
              <button 
                type="button" 
                className="btn-cancel" 
                onClick={() => navigate('/businessTab#misJuegos')}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ModificacionVideojuego;
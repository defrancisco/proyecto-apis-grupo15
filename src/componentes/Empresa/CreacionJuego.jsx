import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer'; 
import '../../styles/gameForm.css'
import { formValidation } from "../IniciosSesion/formValidation";
import { useNavigate } from 'react-router-dom';


function CreacionVideojuego() {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    idioma: '',
    descripcion: '',
    reqMinimos: '',
    reqRecomendados: '',
    imagen: null,
    operatingSystem: '',
    players: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      imagen: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    
    // Validar categoría
    const validCategories = ['Accion', 'Aventura', 'RPG', 'Estrategia', 'Deporte', 'Simulacion', 'Acertijos'];
    if (!validCategories.includes(formData.categoria)) {
      alert('Categoría inválida. Las categorías permitidas son: ' + validCategories.join(', '));
      return;
    }

    // Validar sistema operativo
    const validOS = ['Windows', 'MacOS', 'Linux', 'Android', 'iOS', 'Nintendo'];
    if (!validOS.includes(formData.operatingSystem)) {
      alert('Sistema operativo inválido. Los sistemas permitidos son: ' + validOS.join(', '));
      return;
    }

    form.append('name', formData.nombre);
    form.append('categories', JSON.stringify([formData.categoria]));
    form.append('price', formData.precio);
    form.append('description', formData.descripcion);
    form.append('operatingSystem', formData.operatingSystem);
    form.append('languages', JSON.stringify([formData.idioma]));
    form.append('players', formData.players);
    form.append('minRequirements', formData.reqMinimos);
    form.append('recommendedRequirements', formData.reqRecomendados);
    
    if (formData.imagen) {
      form.append('imagen', formData.imagen);
    }

    try {
      const response = await fetch('http://localhost:3000/api/business/games', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: form
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Juego creado exitosamente');
        navigate('/empresa/juegos');
      } else {
        alert(`Error al crear el juego: ${data.message}`);
        console.error('Error detallado:', data.error);
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
      console.error('Error:', error);
    }

    document.addEventListener('DOMContentLoaded', () => {
      formValidation(); // Invoca la función
    });
  
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <form className="game-form justify-content-center" onSubmit={handleSubmit}>
          <h2>Creación de Videojuego</h2>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Nombre"
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
                value={formData.categoria}
                onChange={handleInputChange}
                placeholder="Categoría"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="precio">Precio</label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                placeholder="$"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="idioma">Idioma</label>
              <input
                type="text"
                id="idioma"
                name="idioma"
                value={formData.idioma}
                onChange={handleInputChange}
                placeholder="Idioma"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción del Juego</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
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
              value={formData.reqMinimos}
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
              value={formData.reqRecomendados}
              onChange={handleInputChange}
              placeholder="Especificar"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="imagen">Imagen del Juego</label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="operatingSystem">Sistema Operativo</label>
            <select
              id="operatingSystem"
              name="operatingSystem"
              value={formData.operatingSystem}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar Sistema Operativo</option>
              <option value="Windows">Windows</option>
              <option value="MacOS">MacOS</option>
              <option value="Linux">Linux</option>
              <option value="Android">Android</option>
              <option value="iOS">iOS</option>
              <option value="Nintendo">Nintendo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="players">Número de Jugadores</label>
            <input
              type="number"
              id="players"
              name="players"
              value={formData.players}
              onChange={handleInputChange}
              placeholder="Número de jugadores"
              min="1"
              required
            />
          </div>
          <button type="submit" className="btn-submit">Crear Juego</button>
        </form>
      </main>
    </div>
  );
}

export default CreacionVideojuego;
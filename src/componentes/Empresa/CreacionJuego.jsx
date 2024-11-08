import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer'; 
import '../../styles/gameForm.css'
import { formValidation } from "../IniciosSesion/formValidation";


function CreacionVideojuego() {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    idioma: '',
    descripcion: '',
    reqMinimos: '',
    reqRecomendados: '',
    imagen: null
  });

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
    
    // Mapear los nombres de campos del frontend al backend
    form.append('name', formData.nombre);
    form.append('category', formData.categoria);
    form.append('price', formData.precio);
    form.append('description', formData.descripcion);
    form.append('operatingSystem', 'Windows');
    form.append('language', formData.idioma);
    form.append('players', '1');
    form.append('rating', 'E');
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

      if (response.ok) {
        console.log('Juego creado exitosamente');

      } else {
        const error = await response.json();
        console.error('Error al crear el juego:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    document.addEventListener('DOMContentLoaded', () => {
      formValidation(); // Invoca la función
    });
  
  };

  return (
    <div className="flex flex-col min-h-screen">
        <Header/>

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
          <button type="submit" className="btn-submit">Publicar</button>
        </form>
      </main>

    <Footer/>
    </div>
  );
}

export default CreacionVideojuego;
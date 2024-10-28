import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer'; 
import '../../styles/gameForm.css'


function CreacionVideojuego() {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    idioma: '',
    descripcion: '',
    reqMinimos: '',
    reqRecomendados: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del nuevo juego:', formData);
    // Aquí iría la lógica para enviar los datos al servidor
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
          <button type="submit" className="btn-submit">Publicar</button>
        </form>
      </main>

    <Footer/>
    </div>
  );
}

export default CreacionVideojuego;
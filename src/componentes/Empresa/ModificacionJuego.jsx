import React, { useState, useEffect } from 'react';
import Header from '../Header'
import Footer from '../Footer'; 
import '../../styles/gameForm.css'

function ModificacionVideojuego() {
  const [gameData, setGameData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    idioma: '',
    descripcion: '',
    reqMinimos: '',
    reqRecomendados: ''
  });

  useEffect(() => {
    // Simular la carga de datos del juego desde la base de datos
    const fetchGameData = () => {
      // Agarrar datos de la base de datos, llamada
      const mockGameData = {
        nombre: '',
        categoria: '',
        precio: '',
        idioma: '',
        descripcion: '', 
        reqMinimos: '',
        reqRecomendados: ''
      };
      setGameData(mockGameData);
    };

    fetchGameData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGameData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del juego actualizados:', gameData);
    // Aquí iría la lógica para enviar los datos actualizados al servidor
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main>
        <div className="game-edit-container">
          <div className="game-image">
            <img src="/placeholder-image.jpg" alt="Imagen del juego" />
            <p>Última modificación: {new Date().toLocaleDateString()}</p>
          </div>
          <form className="game-form" onSubmit={handleSubmit}>
            <h2>Modificación de Videojuego</h2>
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
            <div className="form-actions">
              <button type="submit" className="btn-submit">Guardar cambios</button>
              <button type="button" className="btn-cancel">Cancelar</button>
            </div>
          </form>
        </div>
      </main>

    <Footer/>
    </div>
  );
}

export default ModificacionVideojuego;
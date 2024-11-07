import React from 'react';
import videogames from '../../data/videogames';
import '../../styles/catalogo.css';
import Videojuego from './Videojuego';


const Catalogo = () => {
  const videoGamesList = videogames.map(v => {
    return <Videojuego image={v.image} title={v.title}
      price={v.price} />;
  });

  return (
    <div>

      <div className="main-content">
        <div className="filter-bar">
          <button className="filter-btn">Eliminar Filtros</button>
          <div className="filters">
            <details className="filter-item">
              <summary>Categoría</summary>
              <div>
                <label><input type="checkbox" />Acción</label>
                <label><input type="checkbox" />Aventura</label>
                <label><input type="checkbox" />RPG</label>
                <label><input type="checkbox" />Estrategia</label>
                <label><input type="checkbox" />Simulación</label>
                <label><input type="checkbox" />Deporte</label>
                <label><input type="checkbox" />Acertijos</label>
              </div>
            </details>
            <details className="filter-item">
              <summary>Precio</summary>
              <div>
              <label><input type="checkbox" />1-20</label>
              <label><input type="checkbox" />20-30</label>
              <label><input type="checkbox" />30-40</label>
              <label><input type="checkbox" />50-60</label>
              <label><input type="checkbox" />+60</label>
              </div>
            </details>
            <details className="filter-item">
              <summary>Sistema Operativo</summary>
              <div>
              <label><input type="checkbox" />Nintendo</label>
              <label><input type="checkbox" />Windows</label>
              <label><input type="checkbox" />MacOS</label>
              <label><input type="checkbox" />Linux</label>
              <label><input type="checkbox" />Android</label>
              <label><input type="checkbox" />iOS</label>
              </div>
            </details>
            <details className="filter-item">
              <summary>Idioma</summary>
              <div>
              <label><input type="checkbox" />Español</label>
              <label><input type="checkbox" />Inglés</label>
              <label><input type="checkbox" />Japonés</label>
              </div>
            </details>
            <details className="filter-item">
              <summary>Cantidad de jugadores</summary>
              <div>
              <label><input type="checkbox" />SinglePlayer</label>
              <label><input type="checkbox" />MultiPlayer</label>
              </div>
            </details>
            <details className="filter-item">
              <summary>Calificación</summary>
              <div>
              <label><input type="checkbox" />1</label>
              <label><input type="checkbox" />2</label>
              <label><input type="checkbox" />3</label>
              <label><input type="checkbox" />4</label>
              <label><input type="checkbox" />5</label>

              </div>
            </details>
          </div>
        </div>

        <div className="catalog-content">
          <div className="search-bar">
            <input type="text" placeholder="Buscar" />
            <button>🔍</button>
          </div>
          <div className="videogames">
            {videoGamesList}
          </div>
        </div>
      </div>
 
    </div>
  );
};

export default Catalogo;

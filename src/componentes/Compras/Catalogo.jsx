import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
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
      <Header />
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
              </div>
            </details>
            <details className="filter-item">
              <summary>Precio</summary>
            </details>
            <details className="filter-item">
              <summary>Sistema Operativo</summary>
            </details>
            <details className="filter-item">
              <summary>Idioma</summary>
            </details>
            <details className="filter-item">
              <summary>Cantidad de jugadores</summary>
            </details>
            <details className="filter-item">
              <summary>Calificación</summary>
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
      <Footer />
    </div>
  );
};

export default Catalogo;

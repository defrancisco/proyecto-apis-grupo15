import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Card from './Card';
import videogames from '../../data/videogames';


const Catalogo = () => {
  const videoGamesList = videogames.map(v => {
    return <Card image={v.image} title={v.title}
    price={v.price} />;
  });

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className='container'>
        {videoGamesList}
      </div>
      {/* BARRA DE BUSQUEDA */}
      <div className="search-bar">
        <input type="text" placeholder="Buscar" />
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="main-container">
        {/* BARRA DE FILTROS */}
        <div className="filter-bar">
          <button className="filter-btn">Eliminar Filtros</button>
          <div className="filters">
            <div className="filter-item">Categoría</div>
            <div className="filter-item">Precio</div>
            <div className="filter-item">Sistema Operativo</div>
            <div className="filter-item">Idioma</div>
            <div className="filter-item">Cantidad de jugadores</div>
            <div className="filter-item">Calificación</div>
          </div>
        </div>

        {/* VIDEOJUEGOS */}
      </div>
      <Footer />
    </div>
  );
};

export default Catalogo;

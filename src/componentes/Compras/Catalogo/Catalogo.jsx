import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import videogames from '../../../data/videogames';
import BarraFiltros from './BarraFiltros';
import BarraBusqueda from './BarraBusqueda';
import  '../../../styles/catalogo.css';
import Videojuego from './Videojuego';


const Catalogo = () => {
  const videoGamesList = videogames.map(v => {
    return <Videojuego image={v.image} title={v.title}
    price={v.price} />;
  });

  return (
    <div className="catalog-page">
      <Header />

      <div className="main-content">
        <BarraFiltros />
  
        <div className="catalog-content">
          <BarraBusqueda />
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

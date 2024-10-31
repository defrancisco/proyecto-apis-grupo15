import React from 'react'
import Header from '../../Header';
import Footer from '../../Footer';
import videogames from '../../../data/videogames';
import Producto from './Producto';
import ResumenCompra from './ResumenCompra';
import '../../../styles/carritocompras.css';

function CarritoCompras() {

  const videoGamesList = videogames.map(v => {
    return <Producto image={v.image} title={v.title}
      price={v.price} />;
  });

  return (
    <div className="cart-page">
      <Header />

      <div className="products-row">
        <div className="product">
          {videoGamesList}
        </div>
        <div className="summary">
          <ResumenCompra
            subtotal="$27.44"
            tax="$2.00"
            total="$33.43"
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CarritoCompras;
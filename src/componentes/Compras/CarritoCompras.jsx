import React from 'react'
import Header from '../Header';
import Footer from '../Footer';
import videogames from '../../data/videogames';
import Producto from './Producto';
import '../../styles/carritocompras.css';

function CarritoCompras() {

  const videoGamesList = videogames.map(v => {
    return <Producto image={v.image} title={v.title}
      price={v.price} />;
  });

  return (
    <div>
      <Header />
      <div className="cart-page">

        <div className="products-row">
          <div className="product">
            {videoGamesList}
          </div>
          <div className="summary">
            <h5>Resumen de Compra</h5>
            <ul className="list">
              <li>
                <span>Subtotal</span>
                <span>"subtotal"</span>
              </li>
              <li>
                <span>Shipping</span>
                <span>"Shipping"</span>
              </li>
              <li>
                <span>Tax</span>
                <span>"Tax"</span>
              </li>
              <li className="total">
                <strong>Total</strong>
                <strong>"Total"</strong>
              </li>
            </ul>
            <button className="btn-transaction">Continuar Transacción</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CarritoCompras;
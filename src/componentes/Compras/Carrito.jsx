import React, { useState, useEffect }from 'react';
import {Link } from 'react-router-dom';
import Producto from './Producto';
import '../../styles/carritocompras.css';

function Carrito() {
  const [cartItems, setCartItems] = useState([]);
  const [summary, setSummary] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  });


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('/api/cart', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token se maneja correctamente
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items);
          setSummary(data.summary);
        } else {
          console.error('Error fetching cart:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <div className="cart-page">
        <div className="products-row">
          <div className="product">
            {cartItems.map((item) => (
              <Producto 
                key={item.id} 
                image={item.Game.image} 
                title={item.Game.name} 
                price={item.Game.price} 
              />
            ))}
          </div>
          <div className="summary">
            <h5>Resumen de Compra</h5>
            <ul className="list">
              <li>
                <span>Subtotal</span>
                <span>{summary.subtotal.toFixed(2)}</span>
              </li>
              <li>
                <span>Shipping</span>
                <span>{summary.shipping.toFixed(2)}</span>
              </li>
              <li>
                <span>Tax</span>
                <span>{summary.tax.toFixed(2)}</span>
              </li>
              <li className="total">
                <strong>Total</strong>
                <strong>{summary.total.toFixed(2)}</strong>
              </li>
            </ul>
            <button className="btn-transaction" >
              <Link to="/carrito/checkout">Continuar Transacción</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Carrito;
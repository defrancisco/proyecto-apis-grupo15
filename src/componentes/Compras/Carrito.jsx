import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Producto from './Producto';
import '../../styles/carritocompras.css';

function Carrito() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [summary, setSummary] = useState({
    subtotal: 0,
    tax: 0,
    total: 0
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/cart', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          
          // Validar que los datos sean los esperados antes de actualizar el estado
          if (data.items && Array.isArray(data.items) && data.summary) {
            setCartItems(data.items);
            setSummary(data.summary);
          } else {
            console.error("Estructura de datos inesperada:", data);
          }
        } else {
          console.error('Error fetching cart:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCart();
  }, []);

  const checkout = () => {
    navigate('/carrito/checkout', { state: { summary } });
  };

  return (
    <div>
      <div className="cart-page">
        <div className="products-row">
          <div className="product">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Producto 
                  key={item.id} 
                  image={`http://localhost:3000/api/games/${item.Game.id}/image`} 
                  title={item.Game?.name} 
                  price={item.Game?.price}
                  quantity={item.quantity} 
                />
              ))
            ) : (
              <p>No hay productos en el carrito.</p>
            )}
          </div>
          <div className="summary">
            <h5>Resumen de Compra</h5>
            <ul className="list">
              <li>
                <span>Subtotal</span>
                <span>${summary.subtotal.toFixed(2)}</span>
              </li>
              <li>
                <span>Impuesto</span>
                <span>${summary.tax.toFixed(2)}</span>
              </li>
              <li className="total">
                <strong>Total</strong>
                <strong>${summary.total.toFixed(2)}</strong>
              </li>
            </ul>
            <button className="btn-transaction" onClick={checkout}>Continuar Transacción
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/metododepago.css';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { summary = { 
    subtotal: 0, 
    tax: 0, 
    total: 0 } } = location.state || {};

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    const fetchPaymentMethod = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/payment-method', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setPaymentData({
            cardNumber: data.cardNumber || '',
            cardHolderName: data.cardHolderName || '',
            expiryDate: data.cardExpirationDate || '',
            cvv: ''
          });
        }
      } catch (error) {
        console.error('Error al cargar método de pago:', error);
      }
    };

    fetchPaymentMethod();
  }, []);

  const handleInputChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.id]: e.target.value
    });
  };

  const handlePurchase = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        alert('¡Compra realizada exitosamente!');
        // Redirigir al usuario a la página principal o de juegos
        navigate('/games');
      } else {
        const error = await response.json();
        alert(error.message || 'Error al procesar la compra');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la compra');
    }
  };

  return (
    <div>
      <div className="payment">
        <div className="content">
          <div className="payment-box">
            <h5>Método de Pago</h5>
            <form>
              <div className="form-group">
                <label htmlFor="card-number">Número de Tarjeta</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="cardNumber" 
                  placeholder="Ingrese los números"
                  value={paymentData.cardNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cardholder-name">Nombre del Titular (como aparece en la tarjeta)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="cardHolderName" 
                  placeholder="Nombre"
                  value={paymentData.cardHolderName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiry-date">Fecha de vencimiento</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="expiryDate" 
                    placeholder="dd/yy"
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">Código de Seguridad</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="cvv" 
                    placeholder="***"
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="summary">
            <h5>Resumen de Pedido</h5>
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
            <button 
              className="btn-transaction" 
              onClick={handlePurchase}
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/metododepago.css';

function Checkout() {
  const location = useLocation();
  const { summary = { 
    subtotal: 0, 
    tax: 0, 
    total: 0 } } = location.state || {};


  return (
    <div>
      <div className="payment">
        <div className="content">
          <div className="payment-box">
            <h5>Método de Pago</h5>
            <form>
              <div className="form-group">
                <label htmlFor="card-number">Número de Tarjeta</label>
                <input type="text" className="form-control" id="card-number" placeholder="Ingrese los números" />
              </div>
              <div className="form-group">
                <label htmlFor="cardholder-name">Nombre del Titular (como aparece en la tarjeta)</label>
                <input type="text" className="form-control" id="cardholder-name" placeholder="Nombre" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiry-date">Fecha de vencimiento</label>
                  <input type="text" className="form-control" id="expiry-date" placeholder="dd/yy" />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">Código de Seguridad</label>
                  <input type="text" className="form-control" id="cvv" placeholder="***" />
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
            <button className="btn-transaction">Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

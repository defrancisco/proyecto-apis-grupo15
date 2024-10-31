import React from 'react'
import '../../../styles/ResumenCompra.css';

export default function ResumenCompra(props) {
  return (
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
  )
}

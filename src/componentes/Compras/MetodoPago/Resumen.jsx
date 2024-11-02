import React from 'react';
import '../../../styles/Resumen.css';

export default function Resumen() {
    return (
        <div className="summary">
            <h5>Order Summary</h5>
            <ul className="list">
                <li>
                    <span>Subtotal</span>
                    <span>$27.44</span>
                </li>
                <li>
                    <span>Shipping</span>
                    <span>$3.99</span>
                </li>
                <li>
                    <span>Tax</span>
                    <span>$2.00</span>
                </li>
                <li className="total">
                    <strong>Total</strong>
                    <strong>$33.43</strong>
                </li>
            </ul>
            <button className="btn-transaction">Comprar</button>
        </div>
    );
}


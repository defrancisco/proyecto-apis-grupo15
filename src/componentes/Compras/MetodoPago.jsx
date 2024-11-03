import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import '../../styles/metododepago.css';

function MetodoPago() {
    return (
        <div>
            <Header />
            <div className="payment-method">
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
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MetodoPago;

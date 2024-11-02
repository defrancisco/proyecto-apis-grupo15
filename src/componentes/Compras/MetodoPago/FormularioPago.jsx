import React from 'react';
import '../../../styles/FormularioPago.css';

export default function FormularioPago() {
    return (
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
    );
}


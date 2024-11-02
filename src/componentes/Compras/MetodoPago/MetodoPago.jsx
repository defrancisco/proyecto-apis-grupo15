import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import '../../../styles/metododepago.css';
import FormularioPago from './FormularioPago';
import Resumen from './Resumen';

function MetodoPago() {
    return (
        <div className="payment-method">
            <Header />
            <div className="content">
                <FormularioPago />
                <Resumen />
            </div>
            <Footer />
        </div>
    );
}

export default MetodoPago;

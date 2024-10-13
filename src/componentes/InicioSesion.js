import React from 'react';
import '../styles/iniciosesion.css';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';

function InicioSesion(){
    return (
        <div>
          <Header />
          <div className="account-type-selection">
            <h2>¿Qué tipo de cuenta desea registrar?</h2>
            <div className="button-group">
              <button type="button" className="personal-account">⭐ Cuenta Personal</button>
              <button type="button" className="business-account">⭐ Cuenta Empresarial</button>
            </div>
            <h2>O si ya tiene cuenta</h2>
            <div className="login">
              <button type="button" className="login-button">⭐ Iniciar Sesión</button>
            </div>
          </div>

          <Footer />
        </div>
      );
}

export default InicioSesion;